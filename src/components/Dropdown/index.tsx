import React from "react";
import "./Dropdown.css";
import { DropdownProps } from "./Dropdown.type";

const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <select 
        className="dropdown-select" 
        value={selectedValue} 
        onChange={(e) => onChange(e?.target?.value)}
      >
        {options?.map(option => (
          <option key={option} value={option}>
            {option?.charAt(0)?.toUpperCase() + option?.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
