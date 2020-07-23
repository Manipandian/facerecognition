import React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';
import Rank from './Component/Rank/Rank';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Facerecognition from './Component/Facerecognition/Facerecognition';
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


// onInputChange = (event) => {
//   this.setState({input: event.target.value})
// }

onFileUpload = (event) => {
    if(event.target.files.length) {

      this.props.generateUrl(event.target.files[0]);

      // let reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      // let file = event.target.files[0];
      // let fullName = file.name;
      // let fileName = fullName.substr(0, fullName.lastIndexOf('.')).toLowerCase()
      // reader.onloadend = async () => {
      //   let imageData = await (reader.result).toString().replace(/^data:(.*,)?/, '');
      //   const bodyFormData = new FormData();
      //   bodyFormData.append('image', imageData);
      //   console.log("Encoded data", imageData);
      //   let res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageURLKey}&name=${fileName}`, bodyFormData);
      //     console.log("O/P image", res.data.data.url)
        // this.setState({this.props.input: res.data.data.url});
     // }
    }
}

onButtonClick = () => {
  if (this.props.imageUrlError === '' && !this.props.isImageUrlPending ) {
      console.log('Its a submit image', this.props.input);
      this.setState({imageUrl: this.props.input, box: {}})
      
      fetch('https://blooming-tundra-10838.herokuapp.com/imageurl', {
        method: 'POST',  
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          input : this.props.input
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
}

onRoutChange = (route) => {
  if (route === 'home') {
    this.setState({isSignedIn: true});
  } else {
    this.setState(initialState);
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
              <Rank user={this.state.user}/>
              <ImageLinkForm onInputChange={this.props.onInputChange } onFileUpload={this.onFileUpload} onButtonClick={this.onButtonClick} user={this.state.user}/>
              <Facerecognition imageUrl={imageUrl} box={box}/>
          </div> 
          : (router === 'signin' ? <SignIn onRoutChange={this.onRoutChange} getUser={this.getUser}/> : <Register onRoutChange={this.onRoutChange} getUser={this.getUser}/> )
        }
      </div>
    );
  } 
}

const visibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default visibleApp;
