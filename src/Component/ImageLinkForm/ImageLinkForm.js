import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onFileUpload, onButtonClick}) => {
    return(
     <div>
         <p className='f3'>
             {'This magic Brain will detect faces in your Picture'}
         </p>
         <div className='center-block'>
             <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' text='image link' onChange={onInputChange} placeholder="Enter image URL..."/>
                <div className="center f2 washed-blue b">{'(OR)'}</div>
                <div className="center">
                    <input type="file" id="file-1" className="inputfile inputfile-1" accept="image/*" onChange={onFileUpload}/>
					<label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label>
                </div>
             </div>
             <div className='center pa4 br3 shadow-5'>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-red ba bw0' onClick={onButtonClick}>Detect</button>
             </div>
         </div>
     </div>
    )
}

export default ImageLinkForm;