import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import BookingOperations from '../features/bookings/BookingOperations';
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
        <BookingOperations />
      </Row>
    </>
  );
}

export default Bookings;
