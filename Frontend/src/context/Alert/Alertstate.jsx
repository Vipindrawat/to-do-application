import React, { useState } from 'react'
import alertcontext from './Alertcontext'

const Alertstate = (props) => {
  const [alert, setalert] = useState({ tag:"",desc:"", color:"" });

  const alerthandle = (tag,desc, color) => {
    setalert({ tag,desc, color });
    setTimeout(() => {
      setalert({  tag:"",desc:"", color:""  })
    }, 2500);
  }

  return (
    <alertcontext.Provider value={{ alert, alerthandle }}>
      {props.children}
    </alertcontext.Provider>
  )
}

export default Alertstate;
