import React from "react";
import IButton from "../interfaces/Button";

const Button: React.FC<IButton> = ({
  label,
  isActive,
  onClick
}) => {
  return (
    <button className={`btn-sm ${isActive ? 'btn-active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;