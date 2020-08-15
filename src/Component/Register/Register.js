import React from 'react';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            passWord: '',
            name: '',
            warning: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({passWord: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onSignIn = () => {
        if(!this.state.email || !this.state.name || !this.state.passWord) {
            this.setState({warning: "Please enter valid data"})
        } else {
            fetch('https://blooming-tundra-10838.herokuapp.com/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    passWord: this.state.passWord,
                    name: this.state.name
                })
            }).then(resp => resp.json())
              .then(user => {
                  if(user.id) {
                    this.props.getUser(user);
                    this.props.onRoutChange('home');
                  }
              })
              .catch(err => console.log('Something went wrong in register', err))
        }
       
     }

    render() {
        return (
            <article className="article-class">
                <main className="main">
                <form className="measure">
                <fieldset id="sign_up" className="fieldset left-right-zero">
                    <legend className="legend-font left-right-zero">Register</legend>
                    <legend className="legend-font left-right-zero" style={{color: 'red'}}>{this.state.warning}</legend>
                    <div style={{marginTop: '1rem'}}>
                    <label className="label" htmlFor="email-address">Name</label>
                    <input 
                        className="input-element"
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div style={{marginTop: '1rem'}}>
                    <label className="label" htmlFor="email-address">Email</label>
                    <input 
                        className="input-element"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                    <label className="label" htmlFor="password">Password</label>
                    <input 
                        className="input-element"
                        type="password"
                        name="password"
                        id="password"
                        style={{fontWeight: 'bold'}}
                        onChange={this.onPasswordChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={this.onSignIn} className="submit-button" type="button" value="Sign in"/>
                </div>
                </form>
            </main>
        </article>
        )
    }
   
}

export default Register;