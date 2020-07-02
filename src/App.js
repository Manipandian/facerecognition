import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Rank from './Component/Rank/Rank';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Facerecognition from './Component/Facerecognition/Facerecognition';
import Clarifai from 'clarifai';

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: '4470b3bdbc974e228e698234c68c52ec'});



const particleOption = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();  
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      router: 'signin',
      isSignedIn: false
    }
  }

  calculateBoxLocation = (response) => {
    const clarfaiLocation = response.outputs[0].data.regions[0].region_info.bounding_box;
    const boxElement = document.getElementById('clarifai-box');
    const width = Number(boxElement.width);
    const height = Number(boxElement.height);
    return {
      top: height * clarfaiLocation.top_row,
      left: width * clarfaiLocation.left_col,
      bottom: height - clarfaiLocation.bottom_row * height,
      right: width - clarfaiLocation.right_col * width
    }
  }

  getBoxData = (data) => {
    this.setState({box: data});
  }


onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonClick = () => {
  this.setState({imageUrl: this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => {
    this.getBoxData(this.calculateBoxLocation(response));
  })
  .catch(err => {
    console.log(err);
  });
}

onRoutChange = (route) => {
  if (route === 'home') {
    this.setState({isSignedIn: true});
  } else {
    this.setState({isSignedIn: false});
  }
  this.setState({router: route})
}

render() {
    const {isSignedIn, imageUrl, box, router } = this.state;
    return (
      <div className="App">
               <Particles className="particle"
                params={particleOption}
              />
        <Navigation onRoutChange={this.onRoutChange} isSignedIn={isSignedIn}/>
        <Logo/>
        { router === 'home' 
          ? <div>
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
              <Facerecognition imageUrl={imageUrl} box={box}/>
          </div> 
          : (router === 'signin' ? <SignIn onRoutChange={this.onRoutChange}/> : <Register onRoutChange={this.onRoutChange}/> )
        }
      </div>
    );
  } 
}

export default App;
