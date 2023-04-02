// import { Buffer } from 'buffer';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import UserDashboard from './Pages/UserDashboard';
// import { ToastContainer } from 'react-toastify';
import AddEvents from './Pages/AddEvents';
import EventPage from './Pages/EventPage';
import Profile from './Pages/Profile';
import OrgDashboard from './Pages/OrgDashboard';

function App() {
	return (
		<div className=''>
			<Routes>
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />

				{/* User Routes */}
				<Route path='/user/dashboard' element={<UserDashboard />} />

				{/* Org Routes */}
				<Route path='/addEvents' element={<AddEvents />} />
				<Route path='/event/:eventId' element={<EventPage />} />
				<Route path='/org/dashboard' element={<OrgDashboard />} />

				{/* MISC */}
				<Route path='/profile/:id' element={<Profile />} />
				{/* </Route> */}
			</Routes>
		</div>
	);
}

export default App;
