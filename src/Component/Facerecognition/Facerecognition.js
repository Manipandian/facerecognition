import React from 'react';
import './Facerecognition.css';


const Facerecognition = ({imageUrl, box}) => {
    return(
     <div className="center ma">
       <div className="absolute mt2">
       <img id="clarifai-box" src={imageUrl} alr='' width='500px' height='auto'/>
       <div className="bounding-box" style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}></div>
       </div>
     </div>
    )
}

export default Facerecognition;