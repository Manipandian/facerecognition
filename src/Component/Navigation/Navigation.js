import React from 'react';
import './Navigation.css';

const Navigation = ({onRoutChange}) => {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div onClick={() => onRoutChange('signin')} className='link-button' >Sign In</div>
                <div onClick={() => onRoutChange('register')} className='link-button' >Register</div>
            </nav>
        )
}

export default Navigation;