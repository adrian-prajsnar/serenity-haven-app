import { useBookings } from './useBookings';
import { useDeleteAllBookings } from './useDeleteAllBookings';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateBookingForm from './CreateBookingForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import OperationsRow from '../../ui/OperationsRow';

function BookingOperations() {
  const { bookings } = useBookings();
  const { deleteAllBookings, isDeletingAll } = useDeleteAllBookings();

  return (
    <OperationsRow>
      <Modal>
        <Modal.Open opens='booking-form'>
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name='booking-form' outsideClickCloseModal={false}>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>

      {bookings?.length > 0 && (
        <Modal>
          <Modal.Open opens='bookings-delete'>
            <Button variation='danger'>Delete all bookings</Button>
          </Modal.Open>
          <Modal.Window name='bookings-delete' smallerWidth={true}>
            <ConfirmDelete
              resourceName='all bookings'
              onConfirm={deleteAllBookings}
              disabled={isDeletingAll}
            />
          </Modal.Window>
        </Modal>
      )}
    </OperationsRow>
  );
}

export default BookingOperations;
