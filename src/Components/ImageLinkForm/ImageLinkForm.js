import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputLinkChange, onSubmitImage }) => {

	return (

		<div>

			<p className="f3">I can detect faces in your pictures. Give me a try.</p>
			
			<div className="center">

				<div className="form pa4 br3 shadow-5">

					<input onChange={onInputLinkChange} className="f4 pa2 w-70" type="text" />
					<button onClick={onSubmitImage} className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple">Search</button>

				</div>

			</div>

		</div>

	);

}

export default ImageLinkForm;