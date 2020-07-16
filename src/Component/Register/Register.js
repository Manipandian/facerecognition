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
        // console.log(this.state);
        if(!this.state.email || !this.state.name || !this.state.passWord) {
            this.setState({warning: "Please enter valid data"})
        } else {
            fetch('http://localhost:3001/register', {
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
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80">
                <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <legend className="f6 fw6 ph0 mh0" style={{color: 'red'}}>{this.state.warning}</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
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
                        onChange={this.onPasswordChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={this.onSignIn}   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in"/>
                </div>
                </form>
            </main>
        </article>
        )
    }
   
}

export default Register;