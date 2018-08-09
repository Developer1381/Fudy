import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css'
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import InfoText from './Components/InfoText/InfoText';
import FaceDetection from './Components/FaceDetection/FaceDetection';

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

const defaultState = {
	
	page: "signin",
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: ''
	},
	imageUrl: "",
	inputLink: "",
	box: ""

};

const apiKey = "31b8452ce9d74d2e87489d86a037dcc3";

const app = new Clarifai.App({ apiKey });

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
			},
			imageUrl: "",
			inputLink: "",
			box: ""

		};

	}

	onPageChange = (page) => {

		page === 'home' ? this.setState({isSignedIn: true})
		: this.setState(defaultState);

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

	onInputLinkChange = (event) => {

		this.setState({inputLink: event.target.value});

	}

	onSubmitImage = () => {

		const link = this.state.inputLink;
		this.setState({imageUrl: link});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, link)
		.then(response => {

			this.displayImageBox(this.calculateImageBox(response));
			fetch('https://fudy-api.herokuapp.com/image', {
				method: 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({id: this.state.user.id})
			})
			.then(response => response.json())
			.then(entries => this.setState(Object.assign(this.state.user, {entries})));

    	});

	}

	calculateImageBox = (data) => {

		const element = document.getElementById('image');
		const width = Number(element.width);
		const height = Number(element.height);
   		const { top_row, bottom_row, right_col, left_col } = data.outputs[0].data.regions[0].region_info.bounding_box;
		return {

			top: height * top_row,
			bottom: height - (height * bottom_row),
			right: width - (width * right_col),
			left: width * left_col

		};

	}

	displayImageBox = (box) => this.setState({box});

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
	    					<ImageLinkForm onInputLinkChange={this.onInputLinkChange} onSubmitImage={this.onSubmitImage}/>
	    					<FaceDetection imageUrl={this.state.imageUrl} box={this.state.box} />
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