import React from "react";
import Arrows from './Arrows'
import domain from '../js/domain'

export default Demo = props => {

  const items = props.data
  const size = props.size

  return (
    <>
      {items.map((item, j) => {

        let disabled = ['disabled', ' (Soon)']
        if (item.id === 'puzzle') {
          disabled = ['', '']
        }

        return (
          <div className="row mb-5" key={`demo_${j}`}>
            <div 
              id={`${item.id}Controls`} 
              className="carousel carousel-dark col-md-5 slide mb-md-5 mb-3" 
              data-bs-ride="carousel" 
              style={{"maxWidth":"400px"}}>
              <div className="carousel-inner rounded-1  shadow">
                {item.images.map((img, i) => {
                  return (
                    <div key={`demo_${j}_${i}`} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                      <img className="d-block w-100" src={`${domain}src/img/${img}`} alt="First slide" />                        
                    </div>
                  )})}
                {item.images.length > 1 ? <Arrows id={item.id} /> : null}
              </div>
            </div>
            <div className="col-md-7">
              <h3 className="mb-2">
                <a href="#" className="text-decoration-none text-white">{item.name}</a>
              </h3>
              <p className="mb-2">{item.description}</p>
              <div className="mt-3">
                {item.logos.map((logo, i) => {
                  return (
                    <div key={`logo_${j}_${i}`} className="bg-white me-2 mb-2 d-inline-block p-1 rounded-3">
                      <img height="40" src={`${domain}src/ico/${logo}`} alt={`${logo.split('.')[0]} logo`} />
                    </div>
                  )
                })}
              </div>
              <a href={item.link} target="_blank" className={`btn btn-warning mt-2 ${disabled[0]}`}>Let's try!{disabled[1]}</a>
            </div>
          </div>
        )
      })}
    </>      
  )
}