import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import WrappingRow from '../ui/WrappingRow';

function Cabins() {
  return (
    <>
      <WrappingRow>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </WrappingRow>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
