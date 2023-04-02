import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/user';
import { getPreviousEvents } from '../../service/api';
import OrgEventCard from './OrgEventCard';

function OrgEventsContainer() {
	let { _id } = useUser();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const getEvents = async () => {
			let { data } = await getPreviousEvents(_id);
			setEvents(data);
			console.log(data);
		};

		getEvents();
	}, []);

	return (
		<div className='mt-12 mb-12'>
			<div className='w-full flex justify-between text-loginBlue font-GothamM items-baseline'>
				<div className='text-2xl'>Previous Events</div>
				<div className='text-xs cursor pointer'>View More</div>
			</div>
			<div className='grid grid-cols-2 gap-8 mt-5'>
				{events?.map((info, i) => (
					<OrgEventCard event={info} sentCertificate={false} />
				))}
			</div>
			<div className='grid grid-cols-4 gap-8 mt-24'></div>
		</div>
	);
}

export default OrgEventsContainer;
