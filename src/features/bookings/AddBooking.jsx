import styled from 'styled-components';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateBookingForm from './CreateBookingForm';

const StyledAddBooking = styled.div`
  @media (max-width: 550px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function AddBooking() {
  return (
    <StyledAddBooking>
      <Modal>
        <Modal.Open opens='booking-form'>
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name='booking-form' outsideClickCloseModal={false}>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </StyledAddBooking>
  );
}

export default AddBooking;
