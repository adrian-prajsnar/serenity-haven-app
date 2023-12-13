import { useForm } from 'react-hook-form';

import { useCabins } from '../cabins/useCabins';

import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SelectForm from '../../ui/SelectForm';
import Button from '../../ui/Button';
import CheckboxForm from '../../ui/CheckboxForm';
import Textarea from '../../ui/Textarea';
import { defaultBookingSettings } from '../../utils/constants';
import { addDays, differenceInDays, format, isAfter, parseISO } from 'date-fns';

function CreateBookingForm({ onCloseModal }) {
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const formatedToday = `${new Date().getFullYear()}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;

  const jurek = '2023-12-23';

  function onSubmit(data) {
    console.log(data);
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
          // defaultValue={cabins?.[0].id}
          {...register('cabinId', { required: 'This field is required' })}
        >
          <option value='' disabled selected>
            Choose your cabin
          </option>
          {cabins?.map(cabin => (
            <option key={cabin.id} value={cabin.id}>
              {`${cabin.name} / (up to ${cabin.maxCapacity} people) / ${
                cabin.regularPrice - (cabin.discount || 0)
              } $`}
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
          disabled={false}
          {...register('guestNumber', {
            required: 'This field is required',
          })}
          defaultValue={2}
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
          disabled={false}
          {...register('guestFullName', {
            required: 'This field is required',
          })}
          defaultValue='Jurek Brzęczek'
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
          disabled={false}
          {...register('guestEmail', {
            required: 'This field is required',
          })}
          defaultValue='jurek.brzeczek71@gmail.com'
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
          disabled={false}
          {...register('guestNationality', {
            required: 'This field is required',
          })}
          defaultValue='Poland'
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
          disabled={false}
          {...register('guestNationalId', {
            required: 'This field is required',
          })}
          defaultValue='CET 88892221'
        />
      </FormRow>

      <FormRow
        type='modal'
        label="Applicant's country flag"
        error={errors?.guestCountryFlag?.message}
      >
        <Input
          type='text'
          id='guestCountryFlag'
          defaultValue='https://flagcdn.com/pl.svg'
          disabled={false}
          {...register('guestCountryFlag', {
            required: 'This field is required',
            pattern: {
              value: /^https:\/\/flagcdn\.com\/([a-z]{2}(?:-[a-z]{2})?)\.svg$/,
              message: 'Invalid country flag URL',
            },
          })}
        />
      </FormRow>

      <FormRow
        type='modal'
        label='Arrival date'
        error={errors?.arrivalDate?.message}
      >
        <Input
          type='date'
          id='arrivalDate'
          disabled={false}
          {...register('arrivalDate', {
            required: 'This field is required',
            validate: value =>
              value >= formatedToday || 'Arrival date cannot be before today',
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
          disabled={false}
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
        label='Include breakfast?'
        error={errors?.breakfastIncluded?.message}
      >
        <CheckboxForm
          content={`${defaultBookingSettings.breakfastPrice} $ per day`}
          type='checkbox'
          id='breakfastIncluded'
          disabled={false}
          {...register('breakfastIncluded')}
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
          disabled={false}
          {...register('observations')}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={false}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
