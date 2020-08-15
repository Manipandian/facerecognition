import React from 'react';
import './description.css'


const Description = (props) => {
    return (
    <div className="info-display">
        <div className="face-info">
            {`Face Detected: ${props.data}`}
        </div>
    </div>
    )
}

export default Description;