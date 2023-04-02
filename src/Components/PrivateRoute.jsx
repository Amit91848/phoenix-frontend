import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

function PrivateRoutes() {
	const auth = JSON.parse(localStorage.getItem('login'));
	console.log(auth);
	let token;
	if (auth != null) {
		token = decodeToken(auth.token) || null;
	}

	return (
		<React.Fragment>
			{token != null ? <Outlet /> : <Navigate to='/login' />}
		</React.Fragment>
	);
}

export default PrivateRoutes;
