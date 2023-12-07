import styled from 'styled-components';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabinContainer = styled.div`
  @media (max-width: 550px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function AddCabin() {
  return (
    <AddCabinContainer>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </AddCabinContainer>
  );
}

export default AddCabin;
