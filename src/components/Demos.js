import React from "react";
import * as data from '../js/demos.json'
import Demo from './Demo'

export default Demos = () => {
  return (
    <div className="bg-info text-white pt-4">
      <div className="container col col-lg-10 mx-auto row ">
        <div id="demos">
          <h1 className="mt-5 mb-4">{data.containerTitle}</h1>
          <Demo 
            data={data.demos}
          />
        </div>
      </div>
    </div>
  )
}