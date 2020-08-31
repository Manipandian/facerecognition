import React from 'react';
import './description.css'


const Description = (props) => {
    return (
    <div className="info-container">
        {
            props.operType === "color" ? 
            props.boxData.colorsData.map((data, index) => <div key={index} className="color-pallet" style={{backgroundColor: `${data.raw_hex}`}}>{`${data.w3c.name} : ${Math.round(data.value*100)}%`}</div>) 
            : <div className="face-info">
                { props.operType === "face" ? `Face Detected: ${props.boxData.locations.length}` : `Apparels Detected: ${props.boxData.locations.length}` }
            </div>
        }
       
    </div>
    )
}

export default Description;