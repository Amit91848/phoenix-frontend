import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function EventCard({ event, height = '20', style }) {
	if (event.type !== 'industrial' && event.type !== 'college') {
		return (
			<Link to={`/event/${event._id}`}>
				<div
					style={{ ...style }}
					className={`h-[${height}rem] transition duration-500 sm:h-fit sm:py-4 w-full group hover:bg-black rounded-lg cursor-pointer shadow-[0px_3px_6px_#00000029] flex justify-center`}
				>
					<img
						className={`absolute rounded-lg flex items-center justify-center h-[${height}rem] w-[247px] -z-10`}
						src={event.backgroundImage}
						alt='some shit'
					/>
					<div
						className='h-full w-full group-hover:bg-black rounded-lg flex items-center justify-center'
						style={{
							background:
								'linear-gradient(0deg, #00000088 30%, #ffffff44 100%)',
						}}
					>
						<div className='py-10 w-4/5 my-auto flex flex-col h-full justify-between'>
							<div className='rounded-full bg-slate-300 h-11 w-11 sm:h-6 sm:w-6'></div>
							<div className='flex-1 opacity-0 group-hover:opacity-100 font-GothamL transition duration-700 text-white text-[0.7rem] mt-4 sm:hidden '>
								{' '}
								{event.details?.slice(0, 200)}
							</div>
							<div className='font-GothamM text-xl text-white sm:text-sm'>
								{' '}
								{event.name}
							</div>
							<div className='font-GothamM text-xs text-lightBlue sm:text-[8px]'>
								{event.domain}
							</div>
							<div className='text-right text-white text-xs font-GothamL sm:text-[7px]'>
								<Moment
									date={event.date}
									format='DD/MM/YYYY'
								></Moment>{' '}
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	} else {
		console.log(event.backgroundImage);
		return (
			<a href={event.ext_link} rel='noreferrer' target='_blank'>
				<div
					className={`h-[${height}rem] transition duration-500 sm:h-fit sm:py-4 w-full group hover:bg-black rounded-lg cursor-pointer shadow-[0px_3px_6px_#00000029] flex justify-center`}
				>
					<img
						className={`absolute rounded-lg flex items-center justify-center h-[${height}rem] w-[247px] -z-10`}
						src={`https://${event.backgroundImage}`}
						alt={event.title.slice(0, 20)}
					/>
					<div
						className='h-full w-full group-hover:bg-black rounded-lg flex items-center justify-center'
						style={{
							background:
								'linear-gradient(0deg, #00000088 30%, #ffffff44 100%)',
						}}
					>
						<div className='py-10 w-4/5 my-auto flex flex-col h-full justify-between'>
							<div className='rounded-full bg-slate-300 h-11 w-11 sm:h-6 sm:w-6'></div>
							<div className='flex-1 opacity-0 group-hover:opacity-100 font-GothamL transition duration-700 text-white text-[0.7rem] mt-4 sm:hidden '>
								{' '}
								{event.details?.slice(0, 200)}
							</div>
							<div className='font-GothamM text-xl text-white sm:text-sm'>
								{' '}
								{event.title.slice(0, 25)}
							</div>
							<div className='font-GothamM text-xs text-lightBlue sm:text-[8px]'>
								{event.domain}
							</div>
							<div className='text-right text-white text-xs font-GothamL sm:text-[7px]'>
								{event.date}
							</div>
						</div>
					</div>
				</div>
			</a>
		);
	}
}

export default EventCard;
