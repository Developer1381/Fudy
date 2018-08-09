import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, box }) => {

	return (

		<div className="mt4 center">

			<div style={{position: 'absolute'}}>

				<img id="image" className="br2" style={{width: "500px", height: "auto"}} src={imageUrl} alt=""></img>
				<div className="box" style={{top: box.top, bottom: box.bottom, right: box.right, left: box.left}}></div>
			
			</div>

		</div>

	);

} 

export default FaceDetection;