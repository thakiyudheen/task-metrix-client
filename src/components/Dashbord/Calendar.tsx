import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar: React.FC = () => {
  const [value, setValue] = useState<any>(new Date());

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 md:block hidden">
      <Calendar
        onChange={setValue}
        value={value}
        className="react-calendar"
      />
    </div>
  );
};

export default CustomCalendar;
