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
  const { isLoadingDefaultSettings, loadDefaultSettings } =
    useLoadDefaultSettings();

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
          value={minNights}
          onChange={e => setMinNights(e.target.value)}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating || isLoadingDefaultSettings}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          value={maxNights}
          onChange={e => setMaxNights(e.target.value)}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating || isLoadingDefaultSettings}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          value={maxGuests}
          onChange={e => setMaxGuests(e.target.value)}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating || isLoadingDefaultSettings}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          value={bkfPrice}
          onChange={e => setBkfPrice(e.target.value)}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating || isLoadingDefaultSettings}
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
