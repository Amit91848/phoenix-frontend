import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import {
	getPreviousEvents,
	getUserDetails,
	updateProfile,
	updateSkill,
} from '../service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCamera,
	faPhone,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import useUser from '../hooks/user';
import CertificateCard from '../Components/Profile/CertificateCard';
import SkillsCard from '../Components/Profile/SkillsCard';
// import EventCard from '../Components/EventCard';

function Profile() {
	let params = useParams();
	let id = params.id;
	let { _id, isUser } = useUser();

	const [profileUserDetails, setProfileUserDetails] = useState({
		email: '',
		name: '',
		institute: '',
		about: '',
		linkedin: '',
		number: '',
		occupation: '',
		contactEmail: '',
		skills: [],
		userId: '',
		isUser: false,
	});
	const [skill, setSkill] = useState('');
	const [editProfile, setEditProfile] = useState(false);
	const [orgEvents, setOrgEvents] = useState([]);

	const handleInput = (e) => {
		if (e.target.name === 'skill') {
			setSkill(e.target.value);
		} else {
			setProfileUserDetails({
				...profileUserDetails,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleProfileBtn = () => {
		setEditProfile(!editProfile);
	};

	const handleUpdateBtn = async (e) => {
		handleProfileBtn();

		const message = await updateProfile(profileUserDetails);
	};

	window.onkeydown = async (e) => {
		if (e.keyCode === 13 && skill !== '') {
			await updateSkill(id, skill);
		}
	};

	useEffect(() => {
		const userData = async () => {
			try {
				let data = await getUserDetails(id);
				setProfileUserDetails(data);
				setProfileUserDetails({
					...data,
					userId: data._id,
				});
			} catch (err) {
				console.log(err);
			}
		};

		const eventData = async () => {
			try {
				let events = await getPreviousEvents(profileUserDetails.userId);
				setOrgEvents(events.data);
				console.log(orgEvents);
			} catch (err) {
				console.log(err);
			}
		};

		userData();
		eventData();
	}, [profileUserDetails.userId, id]);

	return (
		<div>
			<Navbar />
			<div className='w-full h-fit'>
				<div className='w-full h-[249px] bg-profileTint z-20 cursor-pointer flex justify-end'>
					{/* <img src="https://picsum.photos/200/300" className='w-full h-full' alt="hi" /> */}
					<FontAwesomeIcon
						className='bg-white px-2 py-1 rounded-md text-xl mt-3 mr-3 absolute'
						icon={faCamera}
					/>
				</div>

				<div className='w-4/5 m-auto h-40'>
					<div className='flex gap-8 justify-between'>
						<div className='relative w-64 h-fit -top-36 shadow-[0px_0px_10px_#0000003E]'>
							<div className='w-64 bg-indigo-300 h-72 flex justify-end'>
								{/* <img src="https://picsum.photos/200/300" className='w-full h-full' alt="hi" /> */}
								<FontAwesomeIcon
									className='bg-white px-2 py-1 rounded-md text-xl mt-3 mr-3 absolute'
									icon={faCamera}
								/>
							</div>

							<div
								className={
									editProfile ? 'hidden' : 'h-fit flex'
								}
							>
								<div className='m-auto w-4/5 h-fit py-8'>
									<div className='text-2xl text-lightBlue font-GothamM'>
										{profileUserDetails.name}
									</div>
									<div className='mt-1 text-[10px] font-GothamBook'>
										{profileUserDetails.institute}
									</div>
									<div className='mt-12 flex items-center'>
										{' '}
										<FontAwesomeIcon
											className='opacity-50'
											icon={faPhone}
										/>{' '}
										<span className='ml-2 text-xs text-loginBlue .font-GothamL cursor-pointer'>
											{profileUserDetails.number}
										</span>{' '}
									</div>
									<div className='mt-1 flex items-center'>
										{' '}
										<FontAwesomeIcon
											className='opacity-50'
											icon={faEnvelope}
										/>{' '}
										<span className='ml-2 text-xs text-loginBlue cursor-pointer .font-GothamL'>
											{!isUser
												? profileUserDetails.contactEmail
												: profileUserDetails.email}
										</span>{' '}
									</div>
									<div className='mt-1 flex items-center'>
										{' '}
										<FontAwesomeIcon
											className='opacity-50'
											icon={faLinkedinIn}
										/>{' '}
										<span className='ml-3 text-xs text-loginBlue cursor-pointer .font-GothamL'>
											{profileUserDetails.linkedin}
										</span>{' '}
									</div>
								</div>
							</div>
						</div>

						<div className='flex flex-col gap-3 mt-8 w-[800px] h-fit'>
							{_id === profileUserDetails.userId &&
								(editProfile ? (
									<button
										className='bg-lightBlue text-white font-GothamM text-base w-40 rounded-lg px-2 py-2 self-end'
										onClick={handleUpdateBtn}
									>
										{' '}
										Update Profile{' '}
									</button>
								) : (
									<button
										className='bg-lightBlue text-white font-GothamM text-base w-40 rounded-lg px-2 py-2 self-end'
										onClick={handleProfileBtn}
									>
										{' '}
										Edit Profile{' '}
									</button>
								))}

							<div className='w-4/5'>
								{/* If org and editing profile */}
								{editProfile &&
									!profileUserDetails.isUser &&
									_id === profileUserDetails.userId && (
										<div className='w-full mb-20'>
											<input
												type='text'
												name='name'
												onChange={handleInput}
												placeholder='Organization Name'
												className='w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
											/>
											<input
												type='text'
												name='institute'
												onChange={handleInput}
												placeholder='Institute'
												className='mt-4 w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
											/>
											<div className='mt-4 flex gap-4'>
												<input
													type='text'
													name='number'
													onChange={handleInput}
													className='w-full h-12 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black'
													placeholder='Contact Number'
												/>
												<input
													type='text'
													name='contactEmail'
													onChange={handleInput}
													className='w-full h-12 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black'
													placeholder='Contact Email'
												/>
											</div>
											<input
												type='text'
												name='linkedin'
												onChange={handleInput}
												placeholder='Linkedin Profile'
												className='mt-4 w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
											/>
											<textarea
												name='about'
												onChange={handleInput}
												rows='8'
												placeholder='About'
												className='mt-4 w-full pt-4 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black resize-none'
											/>
										</div>
									)}

								{/* If Org and NOT editing profile */}
								{!editProfile && !profileUserDetails.isUser && (
									<div>
										<div className='mt-3 font-GothamM text-xl'>
											{profileUserDetails.name}
										</div>
										<div className='mt-3 font-GothamBook text-loginBlue'>
											{profileUserDetails.about}
										</div>
									</div>
								)}

								{/* If Client and editing Profile */}
								{editProfile &&
									profileUserDetails.isUser &&
									_id === profileUserDetails.userId && (
										<div className='w-full mb-20'>
											<input
												type='text'
												name='name'
												onChange={handleInput}
												placeholder='Full Name'
												className='w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
											/>
											<div className='mt-4 flex gap-4'>
												<input
													type='text'
													name='occupation'
													onChange={handleInput}
													placeholder='Occupation'
													className='w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
												/>
												<input
													type='text'
													name='institute'
													onChange={handleInput}
													placeholder='Institute'
													className='w-full h-12 pl-4 font-GothamL text-black opacity-50 rounded-lg placeholder-black bg-[#e5e5e5]'
												/>
											</div>
											<div className='mt-4 flex gap-4'>
												<input
													type='text'
													name='number'
													onChange={handleInput}
													className='w-full h-12 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black'
													placeholder='Contact Number'
												/>
												<input
													type='text'
													name='email'
													onChange={handleInput}
													disabled
													className='w-full h-12 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black'
													placeholder='Email'
												/>
											</div>
											<input
												type='text'
												name='linkedin'
												onChange={handleInput}
												placeholder='Linkedin Profile'
												className='mt-4 w-full h-12 pl-5 font-GothamL bg-[#E5E5E5] placeholder-black opacity-50 rounded-lg'
											/>
											<textarea
												name='about'
												onChange={handleInput}
												rows='8'
												placeholder='About Me'
												className='mt-4 w-full pt-4 pl-4 font-GothamL opacity-50 rounded-lg bg-[#e5e5e5] placeholder-black resize-none'
											/>
										</div>
									)}

								{/* If Client and not editing Profile */}
								{!editProfile && profileUserDetails.isUser && (
									<>
										<div>
											<div className='mt-3 font-GothamM text-xl'>
												About
											</div>
											<div className='mt-3 font-GothamBook text-loginBlue'>
												{profileUserDetails.about}
											</div>
										</div>
										<div className='text-xl font-GothamM mt-5'>
											Skills/Interests
										</div>
										<div className='grid grid-cols-5 gap-3 mt-3'>
											{profileUserDetails.skills?.map(
												(e, i) => (
													<SkillsCard
														key={i}
														skill={e}
													/>
												)
											)}
											<input
												name='skill'
												onChange={handleInput}
												className='font-GothamBook text-xs py-3 text-center bg-cyan-100 rounded-lg'
												placeholder='Enter More...'
											/>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
					{profileUserDetails.isUser && !editProfile && (
						<div className='-mt-20 pb-20'>
							<div className='flex justify-between'>
								<div className='text-loginBlue font-GothamM text-base ml-5'>
									Certificates
								</div>
								<div className='text-loginBlue text-xs font-GothamB cursor-pointer'>
									View More
								</div>
							</div>

							<div className='mt-5 grid grid-cols-6 gap-4'>
								{[...Array(8)].map((_, i) => (
									<CertificateCard key={i} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
