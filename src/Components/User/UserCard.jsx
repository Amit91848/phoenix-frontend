import React from 'react';
import { Link } from 'react-router-dom';

function UserCard({ userId, userDetails }) {
	return (
		<Link to={`/profile/${userId}`}>
			<div className='h-[9.8125rem] w-full shadow-[0px_3px_6px_#00000029] transition duration-500 rounded-xl hover:bg-lightBlue cursor-pointer'>
				<div className='font-GothamB text-4xl py-5 px-7'>
					Hello, <br />{' '}
					<span className='text-xl'> {userDetails.name} </span>{' '}
				</div>
				<div className='text-loginBlue font-GothamM text-xs relative left-3/4 px-4 w-fit'>
					edit
				</div>
			</div>
		</Link>
	);
}

export default UserCard;
