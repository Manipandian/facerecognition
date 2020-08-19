import React from "react";
import './boundingBox.css'


const BoundingBox = (props) => {
let labelBottum = props.height - (props.box.bottom + props.box.top);
let gender = props.box.gender === 'masculine' ? 'Male' : 'Female'
    return (
        <div className="bounding-box" style={{top: props.box.top, right: props.box.right, bottom: props.box.bottom, left: props.box.left}}>
            <label className='box-label' style={{ bottom: labelBottum }}>
                {`${gender} ${props.box.age}`}
            </label>
        </div>
    )
}

export default BoundingBox;