import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllEvents, getExtCollegeEvents } from '../../service/api';
import DashboardHeading from '../DashboardHeading';
import EventCard from './EventCard';

function EventsContainer() {
	const [showEvents, setShowEvents] = useState(4);
	const [events, setEvents] = useState([{}]);
	const [extEvents, setExtEvents] = useState([{}]);

	const handleViewMore = () => {
		if (showEvents === 4) {
			setShowEvents(events.length + 1);
		} else {
			setShowEvents(4);
		}
	};

	useEffect(() => {
		getAllEvents()
			.then((result) => {
				setEvents(result.data);
			})
			.catch((err) => {
				console.log(err);
			});

		getExtCollegeEvents()
			.then((events) => {
				console.log(events);
				setExtEvents(events);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='h-fit mt-14'>
			<div>
				<DashboardHeading
					handleViewMore={handleViewMore}
					name={'Events'}
				/>
				<div className='grid grid-cols-[repeat(auto-fill,minmax(245px,1fr))] gap-5 mt-3'>
					{events?.map((event, i) => (
						<EventCard event={event} key={i} />
					))}
				</div>
			</div>

			<div className='mt-14'>
				<DashboardHeading
					handleViewMore={handleViewMore}
					name={'College Events'}
				/>
				<div className='grid grid-flow-dense grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-5 mt-3'>
					{extEvents.slice(0, 4).map((event, i) => (
						<EventCard
							event={event}
							style={{ gridRow: '1', gridColumn: `${i + 1}` }}
							key={i + 'external'}
						/>
					))}
				</div>
			</div>
			{/* <div className='mt-14'>
				<DashboardHeading
					handleViewMore={handleViewMore}
					name={'Conferences'}
				/>
				<div className='grid grid-flow-dense grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-5 mt-3'>
					{extEvents?.slice(0, 4).map((event, i) => (
						<EventCard
							event={event}
							style={{ gridRow: '1', gridColumn: `${i + 1}` }}
							key={i + 'external'}
						/>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default EventsContainer;
