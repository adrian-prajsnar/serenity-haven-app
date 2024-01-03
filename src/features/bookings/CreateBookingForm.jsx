import { Controller, useForm } from 'react-hook-form';
import { addDays, differenceInDays, isWithinInterval } from 'date-fns';
import styled from 'styled-components';

import { useSettings } from '../settings/useSettings';
import { useBookings } from '../bookings/useBookings';
import { useCabins } from '../cabins/useCabins';
import { useCreateBooking } from './useCreateBooking';
import { useUpdateBooking } from './useUpdateBooking';
import { useCountryFlags } from '../../hooks/useCountryFlags';
import {
  formatCurrency,
  formatDateStringToSupabase,
} from '../../utils/helpers';

import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SelectForm from '../../ui/SelectForm';
import Button from '../../ui/Button';
import CheckboxForm from '../../ui/CheckboxForm';
import Textarea from '../../ui/Textarea';
import SpinnerMini from '../../ui/SpinnerMini';
import Spinner from '../../ui/Spinner';
import DatePicker from '../../ui/DatePicker';

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

function CreateBookingForm({ bookingToUpdate = {}, onCloseModal }) {
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { bookings, isLoading: isLoadingBookings } = useBookings();
  const { createBooking, isCreating } = useCreateBooking();
  const { updateBooking, isUpdating } = useUpdateBooking();
  const { countryFlags, isLoading: isLoadingCountryFlags } = useCountryFlags();

  const isLoadingData =
    isLoadingSettings ||
    isLoadingCabins ||
    isLoadingBookings ||
    isLoadingCountryFlags;
  const isWorking = isCreating || isUpdating;
  const bookingId = bookingToUpdate?.id;
  const guestId = bookingToUpdate?.guests?.id;
  const isUpdateSession = Boolean(bookingId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm({
    defaultValues: isUpdateSession
      ? {
          cabinId: bookingToUpdate.cabins.id,
          guestNumber: bookingToUpdate.numGuests,
          guestFullName: bookingToUpdate.guests.fullName,
          guestEmail: bookingToUpdate.guests.email,
          guestNationality: bookingToUpdate.guests.nationality,
          guestNationalId: bookingToUpdate.guests.nationalID,
          guestCountryFlag: bookingToUpdate.guests.countryFlag,
          arrivalDate: new Date(bookingToUpdate.startDate),
          departureDate: new Date(bookingToUpdate.endDate),
          observations: bookingToUpdate.observations,
          breakfastIncluded: bookingToUpdate.hasBreakfast,
          guestPaid: bookingToUpdate.isPaid,
        }
      : {
          cabinId: '',
          guestCountryFlag: '',
          guestNationality: '',
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

  const sortedCountries = countryFlags
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedCabins = cabins
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectedCabin = sortedCabins?.find(
    cabin => cabin.id === parseInt(cabinId)
  );

  const numNights =
    differenceInDays(new Date(departureDate), new Date(arrivalDate)) <= 0 ||
    differenceInDays(new Date(departureDate), new Date(arrivalDate)) >
      settings?.maxBookingLength
      ? NaN
      : differenceInDays(new Date(departureDate), new Date(arrivalDate));

  const cabinPrice =
    numNights * (selectedCabin?.regularPrice - selectedCabin?.discount);

  const extrasPrice = breakfastIncluded
    ? numNights * settings?.breakfastPrice * parseInt(guestNumber)
    : 0;

  const totalPrice = cabinPrice + extrasPrice;

  function getCurrentCabinExcludedDates() {
    let sortedCabinBookedDates = bookings
      .filter(booking => booking.cabins.id === selectedCabin?.id)
      .map(booking => ({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }))
      .sort((a, b) => a.start - b.start);

    if (isUpdateSession) {
      const currentBookingDates = {
        start: new Date(bookingToUpdate.startDate),
        end: new Date(bookingToUpdate.endDate),
      };

      sortedCabinBookedDates = sortedCabinBookedDates.filter(
        dates =>
          dates.start.getTime() !== currentBookingDates.start.getTime() &&
          dates.end.getTime() !== currentBookingDates.end.getTime()
      );
    }

    const additionalExcludedDates = sortedCabinBookedDates.flatMap(
      (date, index, array) => {
        const prevBookingEnd = date.end;
        const nextBookingStart = array.at(index + 1)?.start;

        if (
          nextBookingStart &&
          differenceInDays(nextBookingStart, prevBookingEnd) <=
            settings?.minBookingLength
        )
          return {
            start: new Date(prevBookingEnd),
            end: new Date(nextBookingStart),
          };
        else return [];
      }
    );

    const excludedDates = [
      ...sortedCabinBookedDates,
      ...additionalExcludedDates,
    ];

    return excludedDates;
  }

  if (isLoadingData) return <Spinner />;

  function onSubmit(data) {
    const guest = {
      fullName: data.guestFullName,
      email: data.guestEmail,
      nationality: data.guestNationality,
      nationalID: data.guestNationalId,
      countryFlag: data.guestCountryFlag,
    };

    const booking = {
      startDate: formatDateStringToSupabase(data.arrivalDate),
      endDate: formatDateStringToSupabase(data.departureDate),
      cabinId: +data.cabinId,
      hasBreakfast: data.breakfastIncluded,
      observations: data.observations,
      isPaid: data.guestPaid,
      numGuests: +data.guestNumber,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
    };

    if (isUpdateSession)
      updateBooking(
        { guest, guestId, booking, bookingId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createBooking(
        { guest, booking },
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
          disabled={isWorking}
        >
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
        error={errors?.guestCountryFlag?.message}
      >
        <>
          <SelectForm
            {...register('guestCountryFlag', {
              required: 'This field is required',
            })}
            disabled={isWorking}
            onChange={e =>
              setValue(
                'guestNationality',
                e.target.selectedOptions[0].getAttribute('data-name')
              )
            }
          >
            {sortedCountries?.map(country => (
              <option
                key={country.code}
                value={country.flagUrl}
                data-name={country.name}
              >
                {country.name}
              </option>
            ))}
          </SelectForm>
        </>
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's national ID"
        error={errors?.guestNationalId?.message}
      >
        <Input
          type='text'
          id='guestNationalId'
          disabled={isWorking}
          {...register('guestNationalId', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Arrival date'
        error={errors?.arrivalDate?.message}
      >
        <div>
          <Controller
            control={control}
            name='arrivalDate'
            disabled={isWorking}
            rules={{
              required: 'This field is required',
              validate: value => {
                if (new Date(departureDate) <= new Date(value))
                  return 'Arrival date must be earlier than departure date';

                const isBetweenExcludedDates =
                  getCurrentCabinExcludedDates()?.some(
                    excludedDate =>
                      isWithinInterval(excludedDate.start, {
                        start: new Date(value),
                        end: new Date(departureDate),
                      }) ||
                      isWithinInterval(excludedDate.end, {
                        start: new Date(value),
                        end: new Date(departureDate),
                      })
                  );

                if (isBetweenExcludedDates)
                  return `Cabin ${selectedCabin.name} has active bookings for the following dates`;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                minDate={new Date()}
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                excludeDateIntervals={getCurrentCabinExcludedDates()}
                disabled={isWorking}
              />
            )}
          ></Controller>
        </div>
      </FormRow>

      <FormRow
        type='modal'
        label='Departure date'
        error={errors?.departureDate?.message}
      >
        <div>
          <Controller
            control={control}
            name='departureDate'
            disabled={isWorking}
            rules={{
              required: 'This field is required',
              validate: value => {
                if (new Date(value) <= new Date(arrivalDate))
                  return 'Departure date must be later than arrival date';

                if (
                  differenceInDays(new Date(value), new Date(arrivalDate)) <
                  settings?.minBookingLength
                )
                  return `Stay has to be at least for ${settings?.minBookingLength} nights`;

                if (
                  differenceInDays(new Date(value), new Date(arrivalDate)) >
                  settings?.maxBookingLength
                )
                  return `Stay cannot be more than ${settings?.maxBookingLength} nights`;

                const isBetweenExcludedDates =
                  getCurrentCabinExcludedDates()?.some(
                    excludedDate =>
                      isWithinInterval(excludedDate.start, {
                        start: new Date(arrivalDate),
                        end: new Date(value),
                      }) ||
                      isWithinInterval(excludedDate.end, {
                        start: new Date(arrivalDate),
                        end: new Date(value),
                      })
                  );

                if (isBetweenExcludedDates)
                  return `Cabin ${selectedCabin.name} has active bookings for the following dates`;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                minDate={addDays(new Date(), settings.minBookingLength)}
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                excludeDateIntervals={getCurrentCabinExcludedDates()}
                disabled={isWorking}
              />
            )}
          ></Controller>
        </div>
      </FormRow>

      <FormRow
        type='modal'
        label='Observations'
        error={errors?.observations?.message}
      >
        <Textarea
          type='text'
          id='observations'
          disabled={isWorking}
          {...register('observations')}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Include breakfast'
        error={errors?.breakfastIncluded?.message}
      >
        <CheckboxForm
          content={`${formatCurrency(settings?.breakfastPrice)} per day`}
          type='checkbox'
          id='breakfastIncluded'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button
          minWidth={isUpdateSession ? '13.9rem' : '16.7rem'}
          disabled={isWorking}
        >
          {isWorking ? (
            <SpinnerMini />
          ) : isUpdateSession ? (
            'Update booking'
          ) : (
            'Create new booking'
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
