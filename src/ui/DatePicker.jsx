import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { HiCalendar } from 'react-icons/hi2';
import { createGlobalStyle } from 'styled-components';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapperStyles = createGlobalStyle`
  /* GENEREAL */
   .react-datepicker {
    font-family: 'Inter', sans-serif;
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
   }
  
   .react-datepicker-wrapper {
    display: block;
   }

  /* INPUT */
  .react-datepicker__view-calendar-icon input {
    cursor: default;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    padding: 0.8rem 1.2rem;

    @media (max-width: 630px) {
      width: 100%;
    }
  }

  .react-datepicker__view-calendar-icon input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  .react-datepicker__input-container .react-datepicker__calendar-icon {
    fill:var(--color-grey-700);
    top: 50%;
    right: 1.2rem;
    transform:translateY(-50%);
  }

  .react-datepicker__input-container .react-datepicker__calendar-icon {
    padding: 0;
  }

  /* CLOSE ICON */
  .react-datepicker__close-icon {
    height: auto;
    padding: 0;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .react-datepicker__close-icon:hover::after {
    background-color: var(--color-grey-100);
  }

  .react-datepicker__close-icon::after {
    font-size: 1.4rem;
    height: 2rem;
    width: 2rem;
    color: var(--color-grey-700);
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-grey-300);
  }

  /* HEADER & MONTH & NAVIGATION */
  .react-datepicker__header,
  .react-datepicker__today-button {
    color: var(--color-grey-700);
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-300);
  }

  .react-datepicker__current-month {
    color: var(--color-grey-700);
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }

  .react-datepicker__month-container{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .react-datepicker__navigation {
    top: 0.8rem;
  }

  /* DAY */
  .react-datepicker__day{
    color: var(--color-grey-600);
    width: 2.7rem;
    line-height: 1.5;
    border-radius: var(--border-radius-sm) !important;
    margin: 0.8rem 0.6rem;
  }

  .react-datepicker__day-names {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.9rem;
    width: 100%;
  }

  .react-datepicker__day-name {
    color: var(--color-grey-600);
    border-radius: 100%;
  }

  .react-datepicker__day:hover {
    background-color: var(--color-grey-100);
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover {
    background-color: var(--color-green-700) !important;
    color: var(--color-green-100) !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  .react-datepicker__day--disabled {
    color: var(--color-grey-300) !important;
  }

  .react-datepicker__day--disabled:hover{
    background-color: transparent;
  }

  /* PORTAL */
  .react-datepicker__portal .react-datepicker__day {
    width: 4rem;

    @media (max-width: 400px) {
      width: 3rem;
    }
  }
  
  /* HELPER CLASSES */
  .saturday {
    color: var(--color-blue-700);
  }

  .sunday {
    color: var(--color-red-700);
  }
`;

function DatePicker({
  minDate,
  selected,
  onChange,
  onBlur,
  excludeDateIntervals,
  disabled,
}) {
  const [withPortal, setWithPortal] = useState(false);
  const [portalId, setPortalId] = useState(null);

  const isSaturday = date => (date.getDay() === 6 ? 'saturday' : null);
  const isSunday = date => (date.getDay() === 0 ? 'sunday' : null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 450;
      setWithPortal(isMobile);
      setPortalId(isMobile ? 'root-portal' : null);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ReactDatePicker
        minDate={minDate}
        selected={selected}
        onChange={onChange}
        onBlur={onBlur}
        excludeDateIntervals={excludeDateIntervals}
        disabled={disabled}
        // Local props
        dayClassName={date => `${isSaturday(date)} ${isSunday(date)}`}
        dateFormat='yyyy-MM-dd'
        todayButton='Today'
        locale={enGB}
        showIcon
        isClearable
        toggleCalendarOnIconClick
        icon={<HiCalendar />}
        withPortal={withPortal}
        portalId={portalId}
      />
      <DatePickerWrapperStyles />
    </>
  );
}

export default DatePicker;
