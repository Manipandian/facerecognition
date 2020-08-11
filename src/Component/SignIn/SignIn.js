import React from 'react';


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
        fetch('https://blooming-tundra-10838.herokuapp.com/signIn', {
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
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80">
                    <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <legend className="f6 fw6 ph0 mh0" style={{color: 'red'}}>{this.state.warning}</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password" 
                            id="password"
                            value={this.state.passWord}
                            onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" onClick={() => onRoutChange('register')} className="f6 link dim black db">Register</a>
                    </div>
                    </form>
                </main>
            </article>
        )
    }
 
}

export default SignIn;