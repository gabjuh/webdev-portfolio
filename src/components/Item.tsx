import React from 'react';

interface IItem {
  children: React.ReactNode;
}

const Item: React.FC<IItem> = ({
  children
}) => {
  return (
    <div className="border border-red-500">
      <div className="year">
        a1986a
      </div>
      {children}
      <div className="item">
        Geburt
      </div>
    </div>
  );
};

export default Item;