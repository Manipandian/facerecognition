import React, {useEffect} from 'react';
import './options.css';

const Options = ({updateOperation, operType, onButtonClick, imageUrl, onRoutChange}) => {
    useEffect(() => {
        onButtonClick(imageUrl, operType);
    }, [operType])
    return(
        <nav className="options-main">
            <ul className="list-container">
                <li className="option-list-item">
                    <button className="button-style" onClick={() => updateOperation("face")}>Face Recognition</button>
                </li>
                <li className="option-list-item">
                    <button className="button-style" onClick={() => updateOperation("apparel")}>Gadget Recognition</button>
                </li>
                <li className="option-list-item">
                    <button className="button-style" onClick={() => updateOperation("color")}>Color Recognition</button>
                </li>
                <li className="option-list-item" style={{marginLeft: 'auto'}}>
                    <button className="button-style" onClick={() => onRoutChange('signin')}>Sign Out</button>
                </li>
            </ul>
        </nav>
    )
}

export default Options;