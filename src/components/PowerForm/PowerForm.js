import React from 'react';
import './PowerForm.css'

const PowerForm = ({onButtonSubmit, onInputChange}) => {
    return(
        <div>
            <p className = 'f3'>{'Enter the updated balanced power in watts!'}</p>
            <div className = 'center'>
                <div className= 'form center pa4 br3 shadow-5 '>
                    <input onChange={onInputChange} className = 'f4 pa2 w-70 center' type = 'tex'/>
                    <button onClick = {onButtonSubmit} className = 'f4 grow link w-30 ph3 pv2 dib white bg-black'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default PowerForm;