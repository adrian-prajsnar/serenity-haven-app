import { useEffect, useState } from 'react';

import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import { useLoadDefaultSettings } from './useLoadDefaultSettings';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { isLoadingDefault, loadDefaultSettings } = useLoadDefaultSettings();

  const [minNights, setMinNights] = useState('');
  const [maxNights, setMaxNights] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [bkfPrice, setBkfPrice] = useState('');

  useEffect(() => {
    const {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = settings || {};

    setMinNights(minBookingLength || '');
    setMaxNights(maxBookingLength || '');
    setMaxGuests(maxGuestsPerBooking || '');
    setBkfPrice(breakfastPrice || '');
  }, [settings]);

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  function handleLoadDefaultSettings(e) {
    e.preventDefault();
    loadDefaultSettings();
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minNights}
          disabled={isUpdating || isLoadingDefault}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxNights}
          disabled={isUpdating || isLoadingDefault}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuests}
          disabled={isUpdating || isLoadingDefault}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={bkfPrice}
          disabled={isUpdating || isLoadingDefault}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>

      <FormRow>
        <Button onClick={handleLoadDefaultSettings}>
          Load default settings
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
