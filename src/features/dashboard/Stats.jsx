import styled from 'styled-components';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';

import Stat from './Stat';

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: span 4;
  column-gap: 2.4rem;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0.6rem;
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
`;

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  const occupationRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;

  const occupation =
    Math.round(occupationRate) > 100
      ? '100%'
      : Math.round(occupationRate) + '%';

  return (
    <StyledStats>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      ></Stat>
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      ></Stat>
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      ></Stat>
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={occupation}
      ></Stat>
    </StyledStats>
  );
}

export default Stats;
