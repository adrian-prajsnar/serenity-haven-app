import AddBooking from '../features/bookings/AddBooking';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import WrappingRow from '../ui/WrappingRow';

function Bookings() {
  return (
    <>
      <WrappingRow>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </WrappingRow>

      <Row>
        <BookingTable />
        <AddBooking />
      </Row>
    </>
  );
}

export default Bookings;
