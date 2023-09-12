import React from 'react'
import loading from './loading.gif';
const Spinner = () => {
    return (
        <div className='Spinnercontainer'>
        <img style={{height: "70px", width: "70px"}}  src={loading} alt='loading'/></div>
    )
}

export default Spinner;