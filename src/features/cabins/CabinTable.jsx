import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useCabins } from './useCabins';

import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

const PhotoHeading = styled.div`
  visibility: hidden;

  @media (max-width: 1250px) {
    visibility: visible;
  }
`;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table
        columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'
        query1={{ columns: '9rem 1fr 1fr', width: '1250px' }}
        query2={{ columns: '6rem 1fr 1fr', width: '450px' }}
      >
        <Table.Header>
          <PhotoHeading>Photo</PhotoHeading>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
