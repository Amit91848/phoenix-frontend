import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SpeakerInfo from '../Components/Event/SpeakerInfo';
import useUser from '../hooks/user';
import { addEvent } from '../service/api';
import { useNavigate } from 'react-router-dom';

function AddEvents() {
	const [rangeValue, setRangeValue] = useState(0);
	const [speakerCount, setSpeakerCount] = useState(1);
	const [picturePreview, setPicturePreview] = useState({});
	const navigate = useNavigate();
	// const [ backgroundURL, setBackgroundURL ] = useState('');
	const [eventData, setEventData] = useState({
		orgId: useUser()._id,
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
		speaker1Photo: '',
		speaker1Details: '',
		speaker2: '',
		speaker2LinkedIn: '',
		speaker2Photo: '',
		speaker2Details: '',
		speaker3: '',
		speaker3LinkedIn: '',
		speaker3Photo: '',
		speaker3Details: '',
		backgroundImage: '',
	});

	const addSpeaker = () => {
		if (speakerCount < 3) {
			setSpeakerCount(speakerCount + 1);
		}
	};

	const handleClose = () => {
		navigate('/org/dashboard');
	};

	const handleImageChange = (e) => {
		const image = e.target.files[0];
		const imageURl = URL.createObjectURL(image);

		if (e.target.name === 'backgroundImage') {
			setPicturePreview(imageURl);
			setEventData({
				...eventData,
				[e.target.name]: image,
			});
		} else {
			setEventData({
				...eventData,
				[e.target.name]: image,
			});
		}
	};

	const handleInputChange = (e) => {
		if (e.target.name === 'price') {
			setRangeValue(e.target.value);
		}
		setEventData({
			...eventData,
			[e.target.name]: e.target.value,
		});
	};

	const handleOn_Off = async (e) => {
		let on_off1 = e.target.className.split(' ')[0];
		let location = e.target.className.split(' ')[1];
		setEventData({
			...eventData,
			[on_off1]: location,
		});
	};

	const handleSubmit = async (e) => {
		const formData = new FormData();
		formData.append('orgId', eventData.orgId);
		formData.append('name', eventData.name);
		formData.append('domain', eventData.domain);
		formData.append('type', eventData.type);
		formData.append('date', eventData.date);
		formData.append('time', eventData.time);
		formData.append('close', eventData.close);
		formData.append('price', eventData.price);
		formData.append('location', eventData.location);
		formData.append('on_off', eventData.on_off);
		formData.append('details', eventData.details);
		formData.append('contact', eventData.contact);
		formData.append('email', eventData.email);
		formData.append('speaker1', eventData.speaker1);
		formData.append('speaker1LinkedIn', eventData.speaker1LinkedIn);
		formData.append('speaker1Details', eventData.speaker1Details);
		formData.append('speaker2', eventData.speaker2);
		formData.append('speaker2LinkedIn', eventData.speaker2LinkedIn);
		formData.append('speaker2Details', eventData.speaker2Details);
		formData.append('speaker3', eventData.speaker3);
		formData.append('speaker3LinkedIn', eventData.speaker3LinkedIn);
		formData.append('speaker3Details', eventData.speaker3Details);
		formData.append('speaker1Photo', eventData.speaker1Photo);
		formData.append('speaker2Photo', eventData.speaker2Photo);
		formData.append('speaker3Photo', eventData.speaker3Photo);
		formData.append('backgroundImage', eventData.backgroundImage);

		const response = await addEvent(formData);
		if (response.status === 201) {
			navigate('/org/dashboard');
		} else {
			alert('Error creating the event');
		}
	};

	return (
		<div>
			<Navbar />

			<div className='h-fit py-10 max-w-[905px] w-10/12 mx-auto mt-11 shadow-[0px_0px_33px_#00000029] rounded-lg flex items-center mb-11'>
				<div className='w-11/12 h-[90%] mx-auto'>
					<div className='flex justify-between items-center'>
						<div className='font-GothamB text-2xl'>
							Enter your event details here
						</div>
						<div
							onClick={handleClose}
							className='text-2xl cursor-pointer'
						>
							X
						</div>
					</div>

					<div className='flex flex-col w-11/12 h-[93%] mx-auto mt-11'>
						<div className='flex justify-between gap-6 w-full md:flex-col'>
							<label
								style={{
									background: `url(${picturePreview}) no-repeat center`,
								}}
								alt='user-bg'
								htmlFor='bgImage'
								className='border rounded-lg h-[325px] flex-[1] cursor-pointer flex justify-center items-center'
							>
								<p className='font-GothamL text-sm text-center'>
									Choose <br /> Background Image
								</p>
								<input
									onChange={handleImageChange}
									type='file'
									name='backgroundImage'
									accept='image/*'
									id='bgImage'
									className='hidden'
								/>
							</label>
							<div className=' h-[325px] flex-[2] w-full flex flex-col justify-between'>
								<input
									onChange={handleInputChange}
									name='name'
									className='input-events'
									placeholder='Event Name'
								/>
								<div className='flex justify-between gap-7 w-full'>
									<input
										onChange={handleInputChange}
										className='input-events'
										placeholder='Event Domain'
										name='domain'
									/>
									<input
										onChange={handleInputChange}
										className='input-events'
										placeholder='Event Type'
										name='type'
									/>
								</div>
								<div className='flex w-full gap-7'>
									<div className='flex flex-col w-full'>
										<div className='font-GothamM text-base'>
											Event Date
										</div>
										<input
											onChange={handleInputChange}
											type='date'
											className='mt-2 bg-inputGrey font-GothamL text-sm pl-4 px-2 w-full h-11 focus:outline-none rounded-lg'
											name='date'
										/>
									</div>
									<div className='flex flex-col w-full'>
										<div className='font-GothamM text-base'>
											Event Time
										</div>
										<input
											onChange={handleInputChange}
											type='time'
											className='mt-2 bg-inputGrey font-GothamL text-sm pl-4 px-2 w-full h-11 focus:outline-none rounded-lg'
											name='time'
										/>
									</div>
								</div>
								<div className='w-full flex flex-col'>
									<div className='font-GothamL text-2xl'>
										Rs.
										<input
											className='w-fit'
											type='number'
											value={rangeValue}
										/>
									</div>
									<input
										onChange={handleInputChange}
										type='range'
										name='price'
										className='cursor-pointer my-4'
										min='0'
										max='5000'
									/>
								</div>
							</div>
						</div>
						<div className='flex justify-between mt-9 items-baseline'>
							<div className='flex flex-col items-between'>
								<div className='font-GothamB text-base'>
									Registration Closes On
								</div>
								<input
									onChange={handleInputChange}
									type='date'
									name='close'
									className='mt-2 bg-inputGrey font-GothamL text-sm pl-4 px-2 w-full h-11 focus:outline-none rounded-lg'
								/>
							</div>
							<div className='flex flex-col w-8/12'>
								<div className='flex'>
									<div
										className='on_off online bg-[#13C0D780] py-2 px-7 cursor-pointer rounded-lg'
										name='online'
										onClick={handleOn_Off}
									>
										Online
									</div>
									<div
										className='on_off offline bg-inputGrey py-2 px-7 cursor-pointer rounded-lg'
										name='offline'
										onClick={handleOn_Off}
									>
										Offline
									</div>
								</div>
								<input
									onChange={handleInputChange}
									type='text'
									name='location'
									placeholder='Enter address'
									className='mt-2 bg-inputGrey font-GothamL text-base pl-4 px-1 w-full h-11 focus:outline-none rounded-lg'
								/>
							</div>
						</div>
						<textarea
							onChange={handleInputChange}
							name='details'
							placeholder='Enter details of event'
							id=''
							cols='30'
							rows='10'
							className='mt-8 resize-none bg-inputGrey font-GothamL text-base pl-4 py-3 px-2 w-full focus:outline-none rounded-lg'
						></textarea>
						<div className='flex mt-7 gap-7'>
							<input
								className='input-events'
								onChange={handleInputChange}
								placeholder='Contact Number'
								name='number'
							/>
							<input
								onChange={handleInputChange}
								className='input-events'
								placeholder='Email ID'
								name='email'
							/>
						</div>
						<div className='mt-7 text-base font-GothamM'>
							Add Speakers(if any, upto 3)
						</div>
						{[...Array(speakerCount)].map((_, i) => (
							<SpeakerInfo
								handleImageChange={handleImageChange}
								handleInputChange={handleInputChange}
								setEventData={setEventData}
								key={i + 1}
								number={i + 1}
							/>
						))}
						<button
							className='bg-inputGrey font-GothamM mt-7 py-3 w-1/3'
							onClick={addSpeaker}
						>
							Add Speaker
						</button>

						<div className='flex gap-8  justify-end w-full'>
							<button
								onClick={handleClose}
								className='w-1/5 h-11 rounded-lg font-GothamB text-loginBlue'
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className='w-1/5 h-11 bg-lightBlue rounded-lg font-GothamB text-white'
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddEvents;
