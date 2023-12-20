import { useCabins } from './useCabins';
import { useDeleteAllCabins } from './useDeleteAllCabins';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import OperationsRow from '../../ui/OperationsRow';

function CabinOperations() {
  const { cabins } = useCabins();
  const { deleteAllCabins, isDeletingAll } = useDeleteAllCabins();

  return (
    <OperationsRow>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form' outsideClickCloseModal={false}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {cabins?.length > 0 && (
        <Modal>
          <Modal.Open opens='cabins-delete'>
            <Button variation='danger'>Delete all cabins</Button>
          </Modal.Open>
          <Modal.Window name='cabins-delete' smallerWidth={true}>
            <ConfirmDelete
              resourceName='all cabins'
              onConfirm={deleteAllCabins}
              disabled={isDeletingAll}
            />
          </Modal.Window>
        </Modal>
      )}
    </OperationsRow>
  );
}

export default CabinOperations;
