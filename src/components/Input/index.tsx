import React from "react";
import { InputProps } from "./input.type";
import "./input.css";

const Input: React.FC<InputProps> = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  name,
  required,
  error,
}) => {
  return (
    <div className="inputContainer">
      {Icon && (
        <div className="iconContainer">
          <Icon />
        </div>
      )}
      <div className="inputWrapper">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={`input ${error ? "inputError" : ""}`}
          required={required}
        />
        <label>
          {placeholder}
          {required && <span className="requiredAsterisk">*</span>}
        </label>
      </div>
      {error && <div className="errorText">{error}</div>}
    </div>
  );
};

export default Input;
