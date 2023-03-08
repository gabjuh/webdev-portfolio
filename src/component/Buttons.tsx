import React, { useState } from 'react';

const Buttons = () => {

  const [selectedButton, setSelectedButton] = useState();

  return (
    <div className="btn-group ">
      <button className={`btn bg-[#6dbc44] hover:bg-[#6dbc44]`}>All</button>
      <button className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44]">IT</button>
      <button className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44]">Music</button>
      <button className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44]">Jobs</button>
      <button className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44]">Schools</button>
      <button className="btn bg-transparent text-[#444] hover:text-white hover:bg-[#6dbc44]">Private</button>
    </div>
  );
};

export default Buttons;