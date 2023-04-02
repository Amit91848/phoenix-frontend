import React from 'react';
import EventCard from '../Event/EventCard';

function OrgEventCard({ sentCertificate, event }) {
	const handleSendCertificate = async () => {
		console.log('send all certificate to id-> ' + event.registrants);
	};
	if (!sentCertificate) {
		return (
			<div className='rounded-lg shadow-event h-fit flex gap-4 px-4 py-6 '>
				<div className='w-1/2 h-[20rem]'>
					<EventCard event={event} />
				</div>
				<div className='w-1/2 font-GothamM flex flex-col justify-between'>
					<div className='text-end'>
						<div className='text-5xl'>26</div>
						<div className='text-xl'>Participants</div>
						<div className='text-2xl mt-2'>
							{event.registrants.length}
						</div>
						<div className='text-base'>Registrants</div>
					</div>
					<div className='flex flex-col'>
						<DownloadReport />
						<button
							onClick={handleSendCertificate}
							className='h-9 text-white bg-loginBlue opacity-70 mt-3 rounded-lg text-xs'
						>
							Send Certificate
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<EventCard />
				<div className='mt-3'>
					<DownloadReport />
				</div>
			</div>
		);
	}
}

export default OrgEventCard;

function DownloadReport() {
	return (
		<button className='w-full h-9 border-loginBlue border-2 rounded-lg text-xs text-loginBlue'>
			Download Report
		</button>
	);
}
