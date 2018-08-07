import React from 'react';

const Navigation = ({ onPageChange, isSignedIn }) => {

	return (
			
			!isSignedIn ?
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onPageChange('signup')} className="f3 link dim black underline pa3 pointer">Register</p>
				<p onClick={() => onPageChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
			</nav>
			:
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onPageChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
			</nav>

	);

}

export default Navigation;