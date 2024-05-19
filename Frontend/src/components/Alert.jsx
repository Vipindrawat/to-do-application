import React,{useContext, useEffect} from 'react'
import alertcontext from '../context/Alert/Alertcontext';

const Alert = () => {
    const data=useContext(alertcontext);
    const {alert}=data;
    return (
        <div className='h-11 mb-2 mt-1'>
         {alert.tag !="" &&   <div className={`bg-green-100 border border-${alert.color}-400 text-${alert.color}-700 px-4 py-3 rounded relative`} role="alert">
                <strong className="font-bold">{alert.tag}:</strong>
                <span className="block sm:inline">{alert.desc}</span>
            </div>}
        </div>
    )
}

export default Alert;
