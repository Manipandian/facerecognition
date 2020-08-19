import React, {useEffect} from "react";
import './over-frame.css';
import Spinner from '../Spinner/spinner';
import BoundingBox from '../BoundingBox/boundingBox';
import Description from '../Description/description';


const Overframe = (props) => {
    let choosedOperation = "Face Recognition";
    let dataAvailable = Boolean(Object.keys(props.box).length);
    let height; 
    let width; 
    if (dataAvailable) {
        height = props.box.height;
        width = props.box.width;
    }

    useEffect(() => {
        props.onButtonClick(props.imageUrl);

    }, [props.imageUrl])

    const renderBox = () => {
        return (
            Object.keys(props.box).length && props.box.locations && props.box.currentImageUrl === props.imageUrl?
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
					        <label htmlFor="file-1" style={{fontSize: '1rem'}}><span>Choose a file</span></label>
                            {" ,or provide direct link"}
                            <div style={{padding: '1rem', display: 'flex'}}>
                            <input className="input-element" id="url-text-box" style={{width: '65%', backgroundColor: 'rgba(0,0,0,0.2)'}} type="text" 
                                // onKeyPress={
                                //     (arg) => 
                                //     {
                                //         if(arg.charC ode === 13 && arg.target.value !== '') {
                                //            console.log(arg.target.value)
                                //         }
                                //     }
                                // }
                                placeholder="Paste Url..."></input><button onClick={props.getDirectUrl} className="url-button">Submit</button>
                            </div>
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