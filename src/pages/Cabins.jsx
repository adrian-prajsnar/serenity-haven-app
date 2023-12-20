import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import CabinOperations from '../features/cabins/CabinOperations';
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
        <CabinOperations />
      </Row>
    </>
  );
}

export default Cabins;
