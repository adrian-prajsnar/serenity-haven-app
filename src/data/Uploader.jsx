import styled from 'styled-components';
import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';

import supabase from '../services/supabase';
import { subtractDates } from '../utils/helpers';
import { defaultBookingSettings } from '../utils/constants';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

import Button from '../ui/Button';
import Heading from '../ui/Heading';
import SpinnerMini from '../ui/SpinnerMini';

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds.map(cabin => cabin.id);
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinsIds.map(cabin => cabin.id);

  const finalBookings = bookings.map(booking => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * defaultBookingSettings.breakfastPrice * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

const StyledUploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
  margin-top: auto;
  text-align: center;
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
`;

function Uploader() {
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  async function uploadAll() {
    setIsLoadingAll(true);

    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoadingAll(false);
    window.location.reload();
  }

  async function uploadBookings() {
    setIsLoadingBookings(true);
    await deleteBookings();
    await createBookings();
    setIsLoadingBookings(false);
    window.location.reload();
  }

  return (
    <StyledUploader>
      <Heading as='h6'>SAMPLE DATA</Heading>

      <Button variation='secondary' onClick={uploadAll} disabled={isLoadingAll}>
        {isLoadingAll ? <SpinnerMini /> : 'Upload ALL'}
      </Button>

      <Button
        variation='secondary'
        onClick={uploadBookings}
        disabled={isLoadingBookings}
      >
        {isLoadingBookings ? <SpinnerMini /> : 'Upload bookings ONLY'}
      </Button>
    </StyledUploader>
  );
}

export default Uploader;
