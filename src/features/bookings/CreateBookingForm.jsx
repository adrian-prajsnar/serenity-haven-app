import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { differenceInDays, format, parseISO, startOfDay } from 'date-fns';

import { useCabins } from '../cabins/useCabins';
import { useCreateBooking } from './useCreateBooking';
import { defaultBookingSettings } from '../../utils/constants';
import {
  formatCurrency,
  formatDateStringToSupabase,
  subtractDates,
} from '../../utils/helpers';

import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SelectForm from '../../ui/SelectForm';
import Button from '../../ui/Button';
import CheckboxForm from '../../ui/CheckboxForm';
import Textarea from '../../ui/Textarea';
import SpinnerMini from '../../ui/SpinnerMini';

const CountryFlag = styled.div`
  display: flex;
  flex-direction: column;

  & > p {
    cursor: pointer;
    margin-top: 0.6rem;
    color: var(--color-grey-500);
    font-size: 1.2rem;
    font-style: italic;
    margin-left: 0.2rem;
  }

  & > p > span {
    font-weight: 600;
  }

  & > a {
    width: fit-content;
    color: var(--color-indigo-700);
    margin-left: 0.2rem;
    font-size: 1.2rem;
  }
`;

const Summary = styled.p`
  min-width: 22.1rem;
  color: var(--color-green-700);

  @media (max-width: 450px) {
    min-width: auto;
  }

  & span {
    font-weight: 500;
  }
`;

function CreateBookingForm({ onCloseModal }) {
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { createBooking, isCreating } = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      cabinId: '',
    },
  });

  const {
    cabinId,
    guestNumber,
    guestFullName,
    arrivalDate,
    departureDate,
    breakfastIncluded,
    guestPaid,
  } = watch();

  const sortedCabins = cabins
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectedCabin = cabins?.find(cabin => cabin.id === parseInt(cabinId));

  const numNights = subtractDates(departureDate, arrivalDate);

  const cabinPrice =
    numNights * (selectedCabin?.regularPrice - selectedCabin?.discount);

  const extrasPrice = breakfastIncluded
    ? numNights * defaultBookingSettings.breakfastPrice * parseInt(guestNumber)
    : 0;

  const totalPrice = cabinPrice + extrasPrice;

  function onSubmit(data) {
    const newGuest = {
      fullName: data.guestFullName,
      email: data.guestEmail,
      nationality: data.guestNationality,
      nationalID: data.guestNationalId,
      countryFlag: data.guestCountryFlag,
    };

    const newBooking = {
      created_at: new Date().toISOString(),
      startDate: formatDateStringToSupabase(data.arrivalDate),
      endDate: formatDateStringToSupabase(data.departureDate),
      cabinId: +data.cabinId,
      guestId: null,
      hasBreakfast: data.breakfastIncluded,
      observations: data.observations,
      isPaid: data.guestPaid,
      numGuests: +data.guestNumber,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: 'unconfirmed',
    };

    createBooking(
      { newGuest, newBooking },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(data) {
    // console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        type='modal'
        label='Cabin details'
        error={errors?.cabinId?.message}
      >
        <SelectForm
          {...register('cabinId', { required: 'This field is required' })}
          disabled={isLoadingCabins || isCreating}
        >
          <option value='' disabled>
            Choose the cabin
          </option>
          {sortedCabins?.map(cabin => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name} / max: {cabin.maxCapacity} people /{' '}
              {formatCurrency(cabin.regularPrice - cabin.discount || 0)} per day
            </option>
          ))}
        </SelectForm>
      </FormRow>

      <FormRow
        type='modal'
        label='Number of guests (including applicant)'
        error={errors?.guestNumber?.message}
      >
        <Input
          type='number'
          id='guestNumber'
          disabled={isCreating}
          {...register('guestNumber', {
            required: 'This field is required',
            validate: value => {
              if (value > selectedCabin?.maxCapacity)
                return 'Number of guests cannot exceed cabin capacity';
              if (value < 1) return 'Number of guests cannot be less than one';
            },
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's full name"
        error={errors?.guestFullName?.message}
      >
        <Input
          type='text'
          id='guestFullName'
          disabled={isCreating}
          {...register('guestFullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's e-mail"
        error={errors?.guestEmail?.message}
      >
        <Input
          type='text'
          id='guestEmail'
          disabled={isCreating}
          {...register('guestEmail', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's nationality"
        error={errors?.guestNationality?.message}
      >
        <Input
          type='text'
          id='guestNationality'
          disabled={isCreating}
          {...register('guestNationality', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's national ID"
        error={errors?.guestNationalId?.message}
      >
        <Input
          type='text'
          id='guestNationalId'
          disabled={isCreating}
          {...register('guestNationalId', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's country flag"
        error={errors?.guestCountryFlag?.message}
      >
        <CountryFlag>
          <Input
            type='text'
            id='guestCountryFlag'
            disabled={isCreating}
            {...register('guestCountryFlag', {
              required: 'This field is required',
              pattern: {
                value:
                  /^https:\/\/flagcdn\.com\/([a-z]{2}(?:-[a-z]{2})?)\.svg$/,
                message: 'Invalid country flag URL',
              },
            })}
          />
          <p
            role='button'
            onClick={e => {
              const text = e.target.closest('p').innerText;
              navigator.clipboard.writeText(text);
              toast.success('Text copied to clipboard');
            }}
          >
            https://flagcdn.com/<span>gb</span>.svg
          </p>
          <a
            rel='noreferrer'
            target='_blank'
            href='https://flagcdn.com/en/codes.json'
          >
            Country abbreviations
          </a>
        </CountryFlag>
      </FormRow>

      <FormRow
        type='modal'
        label='Arrival date'
        error={errors?.arrivalDate?.message}
      >
        <Input
          type='date'
          id='arrivalDate'
          disabled={isCreating}
          {...register('arrivalDate', {
            required: 'This field is required',
            validate: value =>
              value >= format(startOfDay(new Date()), 'yyyy-MM-dd') ||
              'Arrival date cannot be before today',
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Departure date'
        error={errors?.departureDate?.message}
      >
        <Input
          type='date'
          id='departureDate'
          disabled={isCreating}
          {...register('departureDate', {
            required: 'This field is required',
            validate: value =>
              differenceInDays(
                parseISO(value),
                parseISO(getValues('arrivalDate'))
              ) >= defaultBookingSettings.minBookingLength ||
              `Stay has to be at least for ${defaultBookingSettings.minBookingLength} nights`,
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Observations'
        error={errors?.observations?.message}
      >
        <Textarea
          type='text'
          id='observations'
          disabled={isCreating}
          {...register('observations')}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Include breakfast'
        error={errors?.breakfastIncluded?.message}
      >
        <CheckboxForm
          content={`${formatCurrency(
            defaultBookingSettings.breakfastPrice
          )} per day`}
          type='checkbox'
          id='breakfastIncluded'
          disabled={isCreating}
          {...register('breakfastIncluded')}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Payment in advance'
        error={errors?.guestPaid?.message}
      >
        <CheckboxForm
          content={guestPaid ? 'Paid' : 'Unpaid'}
          type='checkbox'
          id='guestPaid'
          disabled={isCreating}
          {...register('guestPaid')}
        />
      </FormRow>

      <FormRow type='modal' label='Stay summary'>
        <Summary>
          <span>{guestFullName || 'Guest'}</span>'s stay at Serenity Hotel will
          be for{' '}
          <span>
            {isNaN(numNights)
              ? '(pick arrival and departure dates)'
              : `${numNights} days`}
          </span>{' '}
          at a total cost of{' '}
          <span>
            {isNaN(totalPrice) ? '(select cabin)' : formatCurrency(totalPrice)}
          </span>
          ,{guestPaid ? ' which has ' : ' to be '}
          <span>{guestPaid ? 'already been paid' : 'paid later'}</span>.
        </Summary>
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button minWidth='16.7rem' disabled={isCreating}>
          {isCreating ? <SpinnerMini /> : 'Create new booking'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
