import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt'
import brain from './brain.png';

const Logo = () => {
    return(
     <div className='ma4 mt0'>
         <Tilt className="Tilt br-2 shadow-2" options={{ max : 25 }} style={{ height: 120, width: 120 }} >
            <div className="Tilt-inner pa3"><img style={{paddingTop: '3px'}} src={brain} alt="logo"/></div>
        </Tilt>
     </div>
    )
}

export default Logo;