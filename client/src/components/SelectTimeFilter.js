import React, { useState } from "react";
import '../components/css/SelectTimeFilter.css'
import Datepicker from "react-tailwindcss-datepicker";
export default function SelectTimeFilter({setCustomTime}) {
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  const handleValueChange = (newValue) => {
    setValue(newValue)
    setCustomTime(newValue); 
  };

  return (
    <div>
      <Datepicker
        i18n={"vi"}
        primaryColor={"fuchsia"} 
        toggleClassName="absolute bg-blue-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
}
