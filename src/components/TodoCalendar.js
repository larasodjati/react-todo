import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styles from './TodoCalendar.module.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-US');
const localizer = momentLocalizer(moment);

function TodoCalendar() {
  const location = useLocation(); // useLocation to access the location state
  const calendarEvents = location.state ? location.state.events : [];
  const navigate = useNavigate(); // useNavigate to get navigate function

  const handleMainPageButton = () => {
    navigate('/todo-list');
  };
  return (
    <div className={styles.rbcCalendar}>
      <Calendar
        views={['day', 'agenda', 'work_week', 'month']}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={calendarEvents}
        className={styles.rbcEvent}
      />
      <button onClick={handleMainPageButton} className={styles.mainPageButton}>
        <i class="fa-solid fa-arrow-left"> Back to Todo List</i>
      </button>
    </div>
  );
}

TodoCalendar.proTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string
    })
  )
};
export default TodoCalendar;
