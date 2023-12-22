import supabase from './supabase';
import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, hasBreakfast, observations, isPaid, status, cabinPrice, extrasPrice, totalPrice, cabins(id, name), guests(id, fullName, email, nationalID, nationality, countryFlag)',
      { count: 'exact' }
    );

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function updateBookingStatus(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking status could not be updated');
  }

  return data;
}

export async function createBooking({ guest, booking }) {
  const { data: guestData, error } = await supabase
    .from('guests')
    .insert([guest])
    .select();

  const newBooking = {
    ...booking,
    created_at: new Date().toISOString(),
    guestId: guestData[0].id,
    status: 'unconfirmed',
  };

  const { data, error: error2 } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select();

  if (error || error2) {
    console.error(error || error2);
    throw new Error('Booking could not be updated');
  }

  return data;
}

export async function updateBooking({ guest, guestId, booking, bookingId }) {
  const { error } = await supabase
    .from('guests')
    .update(guest)
    .eq('id', guestId)
    .select()
    .single();

  const updatedBooking = { ...booking, guestId };

  const { data, error: error2 } = await supabase
    .from('bookings')
    .update(updatedBooking)
    .eq('id', bookingId)
    .select()
    .single();

  if (error || error2) {
    console.error(error || error2);
    throw new Error('Booking could not be updated');
  }

  return data;
}

export async function deleteBooking(id) {
  const {
    data: { guestId },
    error,
  } = await supabase.from('bookings').select('guestId').eq('id', id).single();

  const { data, error: error2 } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  const { error: error3 } = await supabase
    .from('guests')
    .delete()
    .eq('id', guestId);

  if (error || error2 || error3) {
    console.error(error || error2 || error3);
    throw new Error('Booking could not be deleted');
  }

  return data;
}

export async function deleteAllBookings() {
  const { data, error } = await supabase.from('bookings').delete().gt('id', 0);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be deleted');
  }

  return data;
}
