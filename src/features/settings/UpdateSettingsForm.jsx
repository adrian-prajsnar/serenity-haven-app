import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import { useLoadDefaultSettings } from './useLoadDefaultSettings';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { isLoadingDefaultSettings, loadDefaultSettings } =
    useLoadDefaultSettings();
  const isWorking = isUpdating || isLoadingDefaultSettings;

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

  function handleUpdate(e, field, fieldName, min, max, isBreakfast = false) {
    const { value } = e.target;
    if (!value) return;

    switch (true) {
      case value < min:
        toast.error(
          `${fieldName} cannot be less than ${isBreakfast ? '$' : ''}${min} `
        );
        break;
      case value > max:
        toast.error(
          `${fieldName} cannot exceed ${isBreakfast ? '$' : ''}${max} `
        );
        break;
      default:
        updateSetting({ [field]: value });
    }
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
          onBlur={e =>
            handleUpdate(e, 'minBookingLength', 'Minimum nights/booking', 1, 7)
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          value={maxNights}
          onChange={e => setMaxNights(e.target.value)}
          onBlur={e =>
            handleUpdate(e, 'maxBookingLength', 'Maximum nights/booking', 7, 90)
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          value={maxGuests}
          onChange={e => setMaxGuests(e.target.value)}
          onBlur={e =>
            handleUpdate(
              e,
              'maxGuestsPerBooking',
              'Maximum guests/booking',
              1,
              30
            )
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          value={bkfPrice}
          onChange={e => setBkfPrice(e.target.value)}
          onBlur={e =>
            handleUpdate(
              e,
              'breakfastPrice',
              'Breakfast price',
              0.99,
              99.99,
              true
            )
          }
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <Button
          minWidth='17.35rem'
          disabled={isLoadingDefaultSettings}
          onClick={handleLoadDefaultSettings}
        >
          {isLoadingDefaultSettings ? <SpinnerMini /> : 'Load default settings'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
