import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

function TodoCalendar({ events }) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={'start'}
        endAccessor={'end'}
      />
    </div>
  );
}

TodoCalendar.proTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string, // each event has a title
      start: PropTypes.string,
      end: PropTypes.string
    })
  )
};
export default TodoCalendar;
