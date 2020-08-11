import React from 'react';
import './description.css'


const Description = (props) => {
    return (
    <div className="faces-block">{`Face Detected: ${props.data}`}</div>
    )
}

export default Description;