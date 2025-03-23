import React from "react";
import "./RadioButton.css";
import { RadioProps } from "./RadioButton.type";

const RadioButton: React.FC<RadioProps> = ({
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div className={`radio-container ${className} ${disabled ? "disabled" : ""}`}>
      <label htmlFor={id} className="radio-label">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          className="radio-input"
          disabled={disabled}
        />
        <span className="custom-radio">
          <span className="radio-dot" />
        </span>
        <span className="radio-text">{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;