import React from 'react';
import './Button.css';
import { ButtonProps } from './Button.type';
import { ImSpinner8 } from 'react-icons/im';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  size = 'medium',
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const baseClass = 'custom-btn';
  const variantClass = `custom-btn--${variant}`;
  const sizeClass = `custom-btn--${size}`;
  const loadingClass = isLoading ? 'custom-btn--loading' : '';
  const iconOnlyClass = !children && icon ? 'custom-btn--icon-only' : '';

  const combinedClassName = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    iconOnlyClass,
    className
  ]?.filter(Boolean)?.join(' ');

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading && (
        <span className="btn__spinner">
          <ImSpinner8 />
        </span>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      
      {!isLoading && children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

export default Button;