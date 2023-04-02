import React from 'react';
import Navbar from '../Components/Navbar';
import OrgEventsContainer from '../Components/Org/OrgEventsContainer';
import ReminderContainer from '../Components/Reminder/ReminderContainer';

function OrgDashboard() {
	return (
		<div>
			<Navbar />
			<div className='h-fit w-4/5 mx-auto'>
				<ReminderContainer />
				<OrgEventsContainer />
			</div>
		</div>
	);
}

export default OrgDashboard;
