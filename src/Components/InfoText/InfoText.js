import React from 'react';

const InfoText = ({ name, entries }) => {

	return(

		<div>
			
			<p className="f3 white">{`Hi ${name}, your entries numbers is`}</p>
			<p className="f1 white">#{entries}</p>

		</div>

	);

}

export default InfoText;