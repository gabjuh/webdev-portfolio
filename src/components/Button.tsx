import React from "react";
import IButton from "../interfaces/Button";

const Button: React.FC<IButton> = ({
  label,
  isActive,
  onClick
}) => {
  return (
    <button className={`btn-sm px-1.5 sm:px-3 ${isActive ? 'btn-active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;