import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import Heading from '../ui/Heading';
import WrappingRow from '../ui/WrappingRow';

function Bookings() {
  return (
    <>
      <WrappingRow>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </WrappingRow>

      <BookingTable />
    </>
  );
}

export default Bookings;
