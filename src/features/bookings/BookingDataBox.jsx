import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  color: var(--color-brand-50);
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: 1000px) {
    padding: 1.6rem 3.2rem;
  }

  @media (max-width: 550px) {
    padding: 1.2rem 2.4rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 1000px) {
    padding: 2.4rem 3rem 0.8rem;
  }

  @media (max-width: 550px) {
    padding: 1.6rem 2rem 0.6rem;
  }
`;

const Guest = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${props =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${props =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 1000px) {
    padding: 1.2rem 2.4rem;
    margin-top: 1.8rem;
  }

  @media (max-width: 550px) {
    padding: 0.8rem 1.6rem;
    margin-top: 1.2rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </Header>

      <Section>
        <Guest>
          {guests?.countryFlag && (
            <Flag
              src={guests?.countryFlag}
              alt={`Flag of ${guests?.country}`}
            />
          )}
          <p>
            {guests?.fullName ?? '-'}{' '}
            {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{guests?.email ?? '-'}</p>
          <span>&bull;</span>
          <p>National ID {guests?.nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
