import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '../Components/Event/EventCard';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import {
	cancelEvent,
	checkIfRegistered,
	getAllEvents,
	getSimilarEvents,
	getSingleEvent,
	getUserDetails,
	registerUser,
} from '../service/api';
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterIcon,
	TwitterShareButton,
} from 'react-share';
import useUser from '../hooks/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

function EventPage() {
	let params = useParams();
	let eventId = params.eventId;
	const [eventInfo, setEventInfo] = useState({
		name: '',
		domain: '',
		type: '',
		date: '',
		time: '',
		close: '',
		price: 0,
		location: '',
		on_off: 'online',
		details: '',
		contact: '',
		email: '',
		speaker1: '',
		speaker1LinkedIn: '',
		seapker1Photo: '',
		speaker1Details: '',
		speaker2: '',
		speaker2LinkedIn: '',
		seapker2Photo: '',
		speaker2Details: '',
		speaker3: '',
		speaker3LinkedIn: '',
		seapker3Photo: '',
		speaker3Details: '',
		orgId: '',
		organiser: '',
		institute: '',
		about: '',
	});
	let url = window.location.href;
	let { _id: userId } = useUser();
	const [similarEvents, setSimilarEvents] = useState({});
	const [speaker1, setSpeaker1] = useState(true);
	const [speaker2, setSpeaker2] = useState(true);
	const [speaker3, setSpeaker3] = useState(true);
	const [isRegistered, setIsRegistered] = useState(true);

	const speakerCount = () => {
		if (eventInfo.speaker1 === undefined) {
			setSpeaker1(false);
		}
		if (eventInfo.speaker2 === undefined) {
			setSpeaker2(false);
		}
		if (eventInfo.speaker3 === undefined) {
			setSpeaker3(false);
		}
	};

	const copyURL = () => {
		navigator.clipboard.writeText(url);
	};

	const handleRegisterUser = async () => {
		const message = await registerUser({ userId, eventId });
		setIsRegistered(message === true ? true : false);
	};

	const handleCancelEvent = async () => {
		const message = await cancelEvent({ userId, eventId });
		setIsRegistered(message === true ? false : true);
	};

	useEffect(() => {
		const getEvents = async () => {
			try {
				let eventData = await getSingleEvent(eventId);
				setEventInfo(eventData.data);
				speakerCount();

				let simEvents = await getSimilarEvents(eventData.data.domain);
				setSimilarEvents(simEvents);

				let registrationStatus = await checkIfRegistered({
					userId,
					eventId,
				});
				setIsRegistered(registrationStatus === true ? true : false);

				let orgDetails = await getUserDetails(eventInfo.orgId);
				console.log(orgDetails);
				setEventInfo({
					...eventInfo,
					about: orgDetails.about,
					institute: orgDetails.institute,
					organiser: orgDetails.name,
				});
				console.log(eventInfo);
			} catch (er) {
				console.log(er);
			}
		};
		getEvents();
	}, [eventInfo.domain]);

	return (
		<div>
			<Navbar />
			<div className='h-fit w-screen pb-3 mt-10 shadow-[0px_10px_10px_#0000000D]'>
				<div className='mx-auto w-4/5'>
					<div className='flex justify-between items-center'>
						<div className='flex flex-col'>
							<div className='text-3xl font-GothamM'>
								{eventInfo.name}
							</div>
							<div className='mt-5'>
								<div className='flex justify-between font-GothamL items-center'>
									<div className='text-base'>
										{eventInfo.domain}
									</div>
									<div className='text-sm ml-5'>
										<FontAwesomeIcon
											className='text-lightBlue text-xl'
											icon={faCalendar}
										/>
										<span className='ml-1'>
											{' '}
											30th March, 2022 6PM{' '}
										</span>
									</div>
									<div className='text-sm ml-5'>
										<FontAwesomeIcon
											className='text-lightBlue text-xl'
											icon={faLocationPin}
										/>
										<span className='ml-2'>
											{eventInfo.on_off}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className='flex flex-col items-end'>
							{isRegistered ? (
								<div className='w-full'>
									<button
										className=' border-loginBlue border font-GothamM text-base py-3 px-4 rounded-lg text-loginBlue'
										onClick={handleCancelEvent}
									>
										Cancel Event
									</button>
									<button className='bg-lightBlue text-white font-GothamM py-3 px-4 rounded-lg ml-3'>
										View Ticket
									</button>
								</div>
							) : (
								<div>
									<button
										onClick={handleRegisterUser}
										className='bg-lightBlue text-white text-xl rounded-lg py-4 px-6 font-GothamB'
									>
										Register Now
									</button>
									<div className='font-GothamL text-lightBlue text-[10px] mt-2'>
										*Registration Closes on{' '}
										{eventInfo.close}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='flex w-4/5 mx-auto gap-5 mt-10'>
				<div className='flex h-fit flex-col w-[25%]'>
					<EventCard event={eventInfo} />

					<div className='shadow-event rounded-lg w-full py-3 mt-7 flex flex-col items-center justify-center'>
						<div className='w-4/5 h-fit font-GothamL'>
							<div className='text-base'>Speakers</div>
							{speaker1 && (
								<div className='flex py-3 justify-between'>
									<img
										src='https://randomuser.me/api/portraits/men/75.jpg'
										alt=''
										className='rounded-full h-14 w-14'
									/>
									<div className='flex w-full flex-col'>
										<div className='text-loginBlue text-xs flex font-GothamM w-full justify-between'>
											<div className='ml-3'>
												{eventInfo.speaker1}
											</div>
											<Link
												to={
													eventInfo.speaker1LinkedIn ||
													''
												}
											>
												<div className='cursor-pointer'>
													in
												</div>
											</Link>
										</div>
										<div className='ml-3 text-[7px] font-GothamL'>
											{eventInfo.speaker1Details?.slice(
												0,
												100
											)}
										</div>
									</div>
								</div>
							)}
							{speaker2 && (
								<div className='flex py-3 justify-between'>
									<img
										src='https://randomuser.me/api/portraits/men/75.jpg'
										alt=''
										className='rounded-full h-14 w-14'
									/>
									<div className='flex w-full flex-col'>
										<div className='text-loginBlue text-xs flex font-GothamM w-full justify-between'>
											<div className='ml-3'>
												{eventInfo.speaker2}
											</div>
											<Link
												to={
													eventInfo.speaker2LinkedIn ||
													''
												}
											>
												<div className='cursor-pointer'>
													in
												</div>
											</Link>
										</div>
										<div className='ml-3 text-[7px] font-GothamL'>
											{eventInfo.speaker2Details?.slice(
												0,
												100
											)}
										</div>
									</div>
								</div>
							)}
							{speaker3 && (
								<div className='flex py-3 justify-between'>
									<img
										src='https://randomuser.me/api/portraits/men/75.jpg'
										alt=''
										className='rounded-full h-14 w-14'
									/>
									<div className='flex w-full flex-col'>
										<div className='text-loginBlue text-xs flex font-GothamM w-full justify-between'>
											<div className='ml-3'>
												{eventInfo.speaker3}
											</div>
											<Link
												to={
													eventInfo.speaker3LinkedIn ||
													''
												}
											>
												<div className='cursor-pointer'>
													in
												</div>
											</Link>
										</div>
										<div className='ml-3 text-[7px] font-GothamL'>
											{eventInfo.speaker3?.slice(0, 100)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='flex-col flex h-20 w-1/2'>
					<div className='shadow-event grid h-fit gap-5 grid-cols-2 p-5 rounded-lg'>
						<div className='h-20 '>
							<div className='text-[1.15rem] font-GothamL'>
								Organiser
							</div>
							<div className='text-loginBlue font-GothamM text-xs'>
								{eventInfo.organiser}
							</div>
						</div>
						<div className='h-20 '>
							<div className='text-[1.15rem] font-GothamL'>
								Institute
							</div>
							<div className='text-loginBlue font-GothamM text-xs'>
								{eventInfo.institute}
							</div>
						</div>
						<div className='h-20 '>
							<div className='text-[1.15rem] font-GothamL'>
								Entry Fees
							</div>
							<div className='text-loginBlue font-GothamM text-xs'>
								Rs.{eventInfo.price}
							</div>
						</div>
					</div>

					<div className='shadow-event mt-7 p-5'>
						<div className='text-xl font-GothamL'>About Event</div>
						<div className='text-xs mt-2 text-loginBlue font-GothamBook'>
							{eventInfo.details}
						</div>
					</div>

					<div className='shadow-event mt-7 p-5'>
						<div className='flex justify-between items-center'>
							<div className='text-base font-GothamL'>
								See similar events
							</div>
							<div className='font-GothamM text-xs text-loginBlue cursor-pointer'>
								View More
							</div>
						</div>
						<div className='grid grid-cols-2 gap-5 mt-3'>
							{/* Get Similar Events */}
							<EventCard className='h-[40%]' event={eventInfo} />
							<EventCard event={eventInfo} />
						</div>
					</div>
				</div>

				<div className=' h-fit w-[25%]'>
					<div className='shadow-event py-5 px-7 rounded-lg'>
						<Link to={`/profile/${eventInfo.orgId}`}>
							<div className='text-loginBlue h-fit cursor-pointer'>
								<div className='text-xs text-right cursor-pointer'>
									share logo
								</div>
								<div className='rounded-full h-[90px] w-[90px] bg-slate-300 mx-auto'></div>
								<div className='text-xs mx-auto mt-4 text-center font-GothamB'>
									{eventInfo.organiser}
								</div>
								<div className='text-center mx-auto text-xs mt-4 font-'>
									{eventInfo.about}{' '}
								</div>
							</div>
						</Link>
					</div>

					<div className='shadow-event py-5 text-xs px-7 mt-7 rounded-lg'>
						<div className='text-loginBlue font-GothamM'>
							Need further Assistance?
						</div>
						<div className=' font-GothamL mt-3'>
							Contact{' '}
							<span className='font-GothamB ml-1'>
								Middat Sheikh
							</span>{' '}
						</div>
						<div className='mt-3'>
							Call Icon{' '}
							<span className='font-GothamL text-loginBlue'>
								{eventInfo.contact}
							</span>{' '}
						</div>
						<div className='mt-1'>
							email Icon{' '}
							<span className='font-GothamL text-loginBlue'>
								{eventInfo.email}
							</span>{' '}
						</div>
					</div>

					<div className='shadow-event py-5 px-7 rounded-lg mt-7'>
						<div className='text-xs font-GothamM'>Share Event</div>
						<div className='w-full flex justify-between mt-2'>
							<FacebookShareButton quote={url}>
								<FacebookIcon round size={26} />
							</FacebookShareButton>

							<TwitterShareButton className='ml-2'>
								<TwitterIcon round size={26} />
							</TwitterShareButton>

							<div
								className='rounded-lg border cursor-pointer overflow-x-hidden text-xs ml-2 text-slate-500 py-1 px-2 '
								onClick={copyURL}
							>
								{' '}
								{url}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventPage;
