import React from "react";

interface IButton {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

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