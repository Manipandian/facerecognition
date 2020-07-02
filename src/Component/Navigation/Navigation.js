import React from 'react';
import './Navigation.css';

const Navigation = ({isSignedIn ,onRoutChange}) => {
if(isSignedIn) {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div onClick={() => onRoutChange('signin')} className='f3 link dim black underline pa3 pointer' >Sign Out</div>
            </nav>
        )
    } else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div onClick={() => onRoutChange('signin')} className='f3 link dim black underline pa3 pointer' >Sign In</div>
                <div onClick={() => onRoutChange('register')} className='f3 link dim black underline pa3 pointer' >Register</div>
            </nav>
        )
    }
}

export default Navigation;