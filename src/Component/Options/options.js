import React from 'react';
import './options.css';

const Options = (props) => {
    return(
        <div className="options-main">
            <div>
                <button className="button-style" onClick={() => console.log("Face recogntion")}>Face Recognition</button>
            </div>
            <div>
                <button className="button-style" onClick={() => console.log("Gadget recogntion")}>Gadget Recognition</button>
            </div>
            <div>
                <button className="button-style" onClick={() => console.log("Color recogntion")}>Color Recognition</button>
            </div>
        </div>
    )
}

export default Options;