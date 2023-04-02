import React from 'react';
import Navbar from '../Components/Navbar';
// import PrivateRoutes from '../Components/PrivateRoute';
import ReminderContainer from '../Components/Reminder/ReminderContainer';
import EventsContainer from '../Components/Event/EventsContainer';

function UserDashboard() {
	console.log('What the fuck');
	return (
		<div>
			<Navbar />
			<div className='h-fit mb-10 w-4/5 mx-auto'>
				<ReminderContainer />
				<EventsContainer />
			</div>
		</div>
	);
}

export default UserDashboard;
