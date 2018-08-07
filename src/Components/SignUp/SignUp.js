import React from 'react';

class SignUp extends React.Component {

	constructor(props) {

		super(props);
		this.state = {

			name: '',
			email: '',
			password: ''

		};

	}

	onNameChange = (event) => {

		this.setState({name: event.target.value});

	}

	onEmailChange = (event) => {

		this.setState({email: event.target.value});

	}

	onPasswordChange = (event) => {

		this.setState({password: event.target.value});

	}

	onSubmitSignUp = () => {

		const { name, email, password } = this.state;
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name,
				email,
				password
			})
		}).then(res => res.json())
		.then(user => {

			if (user.id) {

				this.props.loadUser(user);
				this.props.onPageChange('home');

			}

		}).catch(console.log);

	}

	render() {

		return (

			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="username">Username</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="mt3">
				      <input onClick={this.onSubmitSignUp} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up" />
				    </div>
				  </div>
				</main>
			</article>

		);

	}

}

export default SignUp;