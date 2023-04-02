import React from 'react';
import Logo from '../Images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/user';

function Navbar() {
	let { isUser } = useUser();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.setItem('login', null);
		navigate('/login');
	};

	return (
		<div className='w-full flex justify-center h-20 top-0 left-0'>
			<div className='w-11/12 h-full flex justify-between items-center'>
				<div className='w-48 h-full'>
					<Link to={`/${isUser ? 'user' : 'org'}/dashboard`}>
						<img
							src={Logo}
							alt='Phoenix Logo'
							className='h-full w-full cursor-pointer'
						/>
					</Link>
				</div>
				<div className=' w-64 h-full flex items-center justify-between '>
					{isUser ? (
						// Search icon
						<div className='cursor-pointer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									stroke-width='1.75'
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
								/>
							</svg>
						</div>
					) : (
						<Link to={'/addEvents'}>
							<button>Add Events</button>
						</Link>
					)}
					<div className='cursor-pointer'>
						{/* Bell Icon */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							class='w-6 h-6'
						>
							<path
								stroke-width='1.75'
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
							/>
						</svg>
					</div>
					<div className='flex justify-between cursor-pointer px-2'>
						{/* Logout */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							class='w-6 h-6'
						>
							<path
								stroke-width='1.75'
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
							/>
						</svg>
						<p className='ml-3 font-GothamM' onClick={handleLogout}>
							Logout
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
