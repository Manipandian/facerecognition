import React, {useEffect} from "react";
import './over-frame.css';
import Spinner from '../Spinner/spinner';
import BoundingBox from '../BoundingBox/boundingBox';
import Description from '../Description/description';


const Overframe = (props) => {
    let choosedOperation = "Face Recognition";
    let dataAvailable = Boolean(Object.keys(props.box).length);
    console.log(props.box);
    let height; 
    let width; 
    if (dataAvailable) {
        height = props.box.height;
        width = props.box.width;
    }

    useEffect(() => {
        console.log("To get clarifai box data");
        props.onButtonClick(props.imageUrl);

    }, [props.imageUrl])

    const renderBox = () => {
        return (
            Object.keys(props.box).length && props.box.locations ?
            props.box.locations.map((location, index) => {
                return <BoundingBox box={location} key={index} height={props.box.height}/>   
            }) : <div></div>
        )
    }

    return (
        <div className="models-page">
            <div className="under-frame">
                <div className="image-frame">
                    {
                        props.imageUrl === '' ? <Spinner/> :
                        <img id="clarifai-box" src={props.imageUrl} alt='' style={{maxWidth: '90%', maxHeight: '90%'}}/>
                    }
                </div>
                <div className="content-frame">
                    <div className="info-skeleton">
                        <div className="custom-image-button">
                            <input type="file" id="file-1" className="inputfile inputfile-1" accept="image/*" onChange={props.onFileUpload}/>
					        <label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="over-frame">
                <div className="over-image">
                    <div style={{
                            width: width,
                            height: height,
                            position: 'absolute',
                        }}>
                        {renderBox()}
                    </div>
                </div>
                <div className="over-info">
                    <h3 className="model-title">{choosedOperation}</h3>
                    <div className="model-info">
                        <div className="info-display">
                            {
                                !dataAvailable ? <Spinner/> :
                                <Description data={props.box.locations.length}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Overframe;