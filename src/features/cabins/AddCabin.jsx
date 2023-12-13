import styled from 'styled-components';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const StyledAddCabin = styled.div`
  @media (max-width: 550px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function AddCabin() {
  return (
    <StyledAddCabin>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </StyledAddCabin>
  );
}

export default AddCabin;
