import React, { useState, useEffect } from 'react';
import ReminderCard from './ReminderCard';
import useUser from '../../hooks/user';
import { getUserDetails } from '../../service/api';
import UserCard from '../User/UserCard';

function ReminderContainer() {
	const [showReminder, setShowReminder] = useState(3);

	const [userDetails, setUserDetails] = useState({});

	let { _id: userId } = useUser();

	const reminders = [
		{
			title: 'Blockchain',
			type: 'Seminar',
			status: 'Ongoing',
			time: '4:00pm - 5:00pm',
		},
		{
			title: 'Blockchain',
			type: 'Seminar',
			date: '23/03/2022',
			time: '4:00pm - 5:00pm',
			timeRemaining: '4',
		},
		{
			title: 'Blockchain',
			type: 'Seminar',
			date: '23/03/2022',
			time: '4:00pm - 5:00pm',
			timeRemaining: '4',
		},
		{
			title: 'Blockchain',
			type: 'Seminar',
			status: 'Ongoing',
			time: '4:00pm - 5:00pm',
		},
		{
			title: 'Blockchain',
			type: 'Seminar',
			date: '23/03/2022',
			time: '4:00pm - 5:00pm',
			timeRemaining: '4',
		},
		{
			title: 'Blockchain',
			type: 'Seminar',
			date: '23/03/2022',
			time: '4:00pm - 5:00pm',
			timeRemaining: '4',
		},
	];

	const handleViewMore = () => {
		if (showReminder === 3) {
			setShowReminder(reminders.length + 1);
		} else {
			setShowReminder(3);
		}
	};

	useEffect(() => {
		const userData = async () => {
			try {
				let data = await getUserDetails(userId);
				setUserDetails((userDetails) => (userDetails = data));
				console.log(userDetails);
			} catch (err) {
				console.log(err);
			}
		};

		userData();
	}, []);

	return (
		<div className='h-fit mt-10'>
			<div className='grid grid-cols-reminder gap-5'>
				<UserCard userId={userId} userDetails={userDetails} />
				<div className='h-full w-full flex flex-col'>
					<div className=' w-full max-h-[48.33px] flex justify-between items-baseline py-3'>
						<div className='font-GothamB text-lightBlue text-2xl'>
							Reminders
						</div>
						<div
							className='font-GothamM text-xs text-loginBlue cursor-pointer'
							onClick={handleViewMore}
						>
							View More
						</div>
					</div>
					<div className=' w-full h-fit grid grid-cols-3 gap-5'>
						{reminders
							?.slice(0, showReminder)
							.map((reminder, i) => (
								<ReminderCard key={i} reminder={reminder} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReminderContainer;
