import React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Rank from './Component/Rank/Rank';
import Overframe from './Component/Over-frame/over-frame';
import { getUrlInput, generateURL } from './Redux/actions'


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
     //input: '',
      // imageUrl: '',
      box: {},
      router: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}


const mapStateToProps = state => {
  return {
    input: state.storeURL.input,
    isImageUrlPending: state.storeURL.isPending,
    imageUrlError: state.storeURL.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(getUrlInput(event.target.value)),
    generateUrl: (file) => dispatch(generateURL(file))
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

  calculateBoxLocation = (response) => {
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
    console.log(finalBoxes);
    return {
      width: width,
      height: height,
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
      // console.log('Its a submit image', this.props.input);
      // this.setState({imageUrl: this.props.input, box: {}})
      
      fetch('https://blooming-tundra-10838.herokuapp.com/imageurl', {
        method: 'POST',  
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input : imageUrl
        })
      })
      .then(response => response.json())
      .then(response => {
        // if(response) {
        //   fetch('https://blooming-tundra-10838.herokuapp.com/image', {
        //     method: 'PUT',  
        //     headers: {'Content-Type' : 'application/json'},
        //     body: JSON.stringify({
        //       id: this.state.user.id
        //     })
        //   })
        //   .then(resp => resp.json())
        //   .then(count => {
        //     this.setState(Object.assign(this.state.user, {entries: count}))
        //   })
        //   .catch(err => console.log(err));
        // }
        console.log(response);
        this.getBoxData(this.calculateBoxLocation(response));
      })
      .catch(err => {
        console.log(err);
      });
  } 
}

onRoutChange = (route) => {
  if (route === 'home') {
    this.setState({isSignedIn: true});
  } else {
    this.setState(  );
  }
  this.setState({router: route})
}

// componentDidMount() {}

render() {
    const {isSignedIn, box, router } = this.state;
    return (
      <div className="App">
               <Particles className="particle"
                params={particleOption}
              />
        <Navigation onRoutChange={this.onRoutChange} isSignedIn={isSignedIn}/>
        {/* <Logo/> */}
        { router === 'home' 
          ? <div className="card-outer">
              {/* <Rank user={this.state.user}/> */}
              {/* <ImageLinkForm onInputChange={this.props.onInputChange } onFileUpload={this.onFileUpload} onButtonClick={this.onButtonClick} user={this.state.user}/>
              <Facerecognition imageUrl={imageUrl} box={box}/> */}
              <Overframe 
                imageUrl={this.props.input} 
                box={box}
                onInputChange={this.props.onInputChange}
                onFileUpload={this.onFileUpload}
                onButtonClick={this.onButtonClick}
                user={this.state.user}
              ></Overframe>
          </div> 
          : (router === 'signin' ? <SignIn onRoutChange={this.onRoutChange} getUser={this.getUser}/> : <Register onRoutChange={this.onRoutChange} getUser={this.getUser}/> )
        }
      </div>
    );
  } 
}

const visibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default visibleApp;
