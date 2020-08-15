import React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Overframe from './Component/Over-frame/over-frame';
import { getUrlInput, generateURL, onRoutChange } from './Redux/actions'

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

const initialState = {
      box: {},
      clarifaiResponse: {},
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}


const mapStateToProps = ( state) => {
  return {
    input: state.storeURL.input,
    isImageUrlPending: state.storeURL.isPending,
    imageUrlError: state.storeURL.error,
    isSignedIn: state.storeURL.isSignedIn,
    router: state.storeURL.router
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(getUrlInput(event.target.value)),
    generateUrl: (file) => dispatch(generateURL(file)),
    onRoutChange: (route) => dispatch(onRoutChange(route))
  }
}

class App extends React.Component {

  constructor() {
    super();  
    this.state = initialState;
  }

  getUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateBoxLocation = (response, imageUrl) => {
    const clarfaiRegions = response.outputs[0].data;
    const boxElement = document.getElementById('clarifai-box');
    const width = Number(boxElement.width);
    const height = Number(boxElement.height);
    let finalBoxes = Object.keys(clarfaiRegions).length ?
      (clarfaiRegions.regions).map((region) => {
        let clarfaiLocation = region.region_info.bounding_box;
        return {
          top: height * clarfaiLocation.top_row,
          left: width * clarfaiLocation.left_col,
          bottom: height - clarfaiLocation.bottom_row * height,
          right: width - clarfaiLocation.right_col * width
        }
      }) : [];
    return {
      width: width,
      height: height,
      currentImageUrl: imageUrl, 
      locations: finalBoxes}
  }

  getBoxData = (data) => {

    this.setState({box: data});
  }

  onFileUpload = (event) => {
      if(event.target.files.length) {
        this.setState({box: {}});
        this.props.generateUrl(event.target.files[0]);
        
      }
  }

onButtonClick = (imageUrl) => {
  
  if (this.props.imageUrlError === '' && !this.props.isImageUrlPending ) {    
      fetch('https://blooming-tundra-10838.herokuapp.com/imageurl', {
        method: 'POST',  
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input : imageUrl
        })
      })
      .then(response => response.json())
      .then(response => {
        this.setState({clarifaiResponse: response});
        this.getBoxData(this.calculateBoxLocation(response, imageUrl));
      })
      .catch(err => {
        console.log(err);
      });
  } 
}

changeBoxsize = (e) => {
  if(this.props.isSignedIn) {
    let currentImageElement = document.getElementById('clarifai-box');
    if(this.state.box.width !== Number(currentImageElement.width) || this.state.box.height !== Number(currentImageElement.height)) {
      this.getBoxData(this.calculateBoxLocation(this.state.clarifaiResponse, this.props.input));
    }
  
  }
}

componentDidMount() {
  window.addEventListener('resize', this.changeBoxsize);
}

componentWillUnmount() {
  window.addEventListener('resize', this.changeBoxsize);
}



render() {
    const { box } = this.state;
    const {input, onInputChange, onRoutChange, isSignedIn, router} = this.props;
    return (
      <div className="App">
               <Particles className="particle"
                params={particleOption}
              />
        <Navigation onRoutChange={onRoutChange} isSignedIn={isSignedIn}/>
        { router === 'home' 
          ? <div className="card-outer">
              <Overframe 
                imageUrl={input} 
                box={box}
                onInputChange={onInputChange}
                onFileUpload={this.onFileUpload}
                onButtonClick={this.onButtonClick}
                user={this.state.user}
              ></Overframe>
          </div> 
          : (router === 'signin' ? <SignIn onRoutChange={onRoutChange} getUser={this.getUser}/> : <Register onRoutChange={onRoutChange} getUser={this.getUser}/> )
        }
      </div>
    );
  } 
}

const visibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default visibleApp;
