import React from 'react';
import './signIn.css';


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: 'testing@gmail.com',
            passWord: 'trial',
            warning: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({passWord: event.target.value});
    }

    onSignIn = () => {
        fetch('https://smart-imagesense.herokuapp.com/signIn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                passWord: this.state.passWord
            })
        }).then(res => res.json())
          .then(data => {
              if(data.id) {
                this.props.getUser(data);
                this.props.onRoutChange('home')
              } else {
                this.setState({
                    warning: "(Please enter a valid email id and password)"
                })
              }
          })  
          .catch(err => console.log('Something went wrong in sign in', err)) 
    }

    render() {
        const {onRoutChange} = this.props;
        return(
            <article className="article-class">
                <main className="main">
                    <form className="measure">
                    <fieldset id="sign_up" className="fieldset left-right-zero">
                        <legend className="legend-font left-right-zero">Sign In</legend>
                        <legend className="legend-font left-right-zero" style={{color: 'red'}}>{this.state.warning}</legend>
                        <div style={{marginTop: '1rem'}}>
                            <label className="label" htmlFor="email-address">Email</label>
                            <input 
                                className="input-element"
                                type="email"
                                name="email-address"
                                id="email-address"
                                value={this.state.email}
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
                            value={this.state.passWord}
                            style={{fontWeight: 'bold'}}
                            onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSignIn} style={{fontWeight: 'bold'}} className="submit-button" type="button" value="Sign in"/>
                    </div>
                    <a href="#0" onClick={() => onRoutChange('register')} className="register-text">Register</a>
                    </form>
                </main>
            </article>
        )
    }
 
}

export default SignIn;