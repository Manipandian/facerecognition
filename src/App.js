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
      input: '',
      imageUrl: '',
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
  
  fetch('https://blooming-tundra-10838.herokuapp.com/imageurl', {
    method: 'POST',  
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      input : this.state.input
    })
  })
  .then(response => response.json())
  .then(response => {
    if(response) {
      fetch('https://blooming-tundra-10838.herokuapp.com/image', {
        method: 'PUT',  
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(resp => resp.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(err => console.log(err));
    }
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
    this.setState(initialState);
  }
  this.setState({router: route})
}

// componentDidMount() {
//   fetch('http://localhost:3001')
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

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
              <Rank user={this.state.user}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} user={this.state.user}/>
              <Facerecognition imageUrl={imageUrl} box={box}/>
          </div> 
          : (router === 'signin' ? <SignIn onRoutChange={this.onRoutChange} getUser={this.getUser}/> : <Register onRoutChange={this.onRoutChange} getUser={this.getUser}/> )
        }
      </div>
    );
  } 
}

export default App;
