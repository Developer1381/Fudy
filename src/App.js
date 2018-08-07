import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css'
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import InfoText from './Components/InfoText/InfoText';

const particleOptions = {

	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 750
			}
		}
	}

}

//const apiKey = "31b8452ce9d74d2e87489d86a037dcc3";

//const app = new Clarifai.App({ apiKey });

class App extends React.Component {

	constructor(props) {

		super(props);
		this.state = {

			page: "signin",
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: ''
			}

		};

	}

	onPageChange = (page) => {

		page === 'home' ? this.setState({isSignedIn: true})
		: this.setState({isSignedIn: false})

		this.setState({page});

	}

	loadUser = (data) => {

		const { id, name, email, entries } = data;

		this.setState({user: {
			id,
			name,
			email,
			entries
		}});

	}

	render() {	

		return (

			<div>

				<Particles className="particle"
	            	params={particleOptions}
	    		/>
	    		<div className="App">

	    			<Navigation onPageChange={this.onPageChange} isSignedIn={this.state.isSignedIn} />
	    			{ 

	    				this.state.page === 'home' ? 
	    				<div>
	    					<InfoText name={this.state.user.name} entries={this.state.user.entries} />
	    					<ImageLinkForm />
	    				</div>
	    				:
	    				this.state.page === 'signin' ?
	    				<SignIn onPageChange={this.onPageChange} loadUser={this.loadUser} />
	    				:
	    				<SignUp onPageChange={this.onPageChange} loadUser={this.loadUser} />

	    			}

	    		</div>

	    	</div>

		)

	}

}

export default App;