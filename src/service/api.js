import axios from 'axios';

const apiURL = 'http://localhost:5000';

const signupURL = `${apiURL}/auth/signup`;
const loginURL = `${apiURL}/login`;
// Organisation
const addEventURL = `${apiURL}/organisation/addEvent`;
const getPreviousEventsURL = `${apiURL}/organisation/allEvents`;

// User
const getAllEventsURL = `${apiURL}/user/getEvents`;
const getSimilarEventsURl = `${apiURL}/user/getSimilarEvents`;
const registerUserURL = `${apiURL}/user/register`;
const checkIfRegisteredURL = `${apiURL}/user/isRegistered`;
const cancelEventURL = `${apiURL}/user/cancelEvent`;
const getUserDetailsURL = `${apiURL}/user`;
const updateSkillURL = `${apiURL}/user/updateSkill`;

// Event
const getSingleEventURL = `${apiURL}/event/`;
const getExtCollegeEventsURL = `${apiURL}/event/external?type=college`;

// Profile
const updateProfileURL = `${apiURL}/profile/update`;

// Common

export const signup = async (credentials) => {
	try {
		const response = await axios.post(signupURL, credentials);
		const successMessage = response.data.message;
		if (successMessage) {
			alert(successMessage);
			return response;
		}
	} catch (err) {
		alert(err.response.data.message);
	}
};

export const login = async (credentials) => {
	try {
		const User = await axios.post(loginURL, credentials);
		return User;
	} catch (err) {
		alert(err.response.data.message);
	}
};

export const getSingleEvent = async (eventId) => {
	try {
		const url = getSingleEventURL + eventId;
		const Event = await axios.get(url, eventId);
		return Event;
	} catch (err) {
		alert(err.response.data.message);
	}
};

export const updateProfile = async (credentials) => {
	try {
		const data = await axios.put(updateProfileURL, credentials);
		console.log(data);
	} catch (err) {
		alert(err.response.data.message);
	}
};

export const getUserDetails = async (credentials) => {
	try {
		const user = await axios.get(getUserDetailsURL + `/id/${credentials}`);
		return user.data;
	} catch (err) {
		console.log(err);
	}
};

// Organisation API

export const addEvent = async (formData) => {
	try {
		const message = await axios.post(addEventURL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return message;
	} catch (err) {
		alert(err.response.data.message);
	}
};

export const getPreviousEvents = async (orgId) => {
	try {
		const events = await axios.get(getPreviousEventsURL + `/${orgId}`);
		return events;
	} catch (err) {
		alert(err.response.data.message);
	}
};

// USER API

export const getAllEvents = async (credentials) => {
	try {
		const events = await axios.get(getAllEventsURL, credentials);
		return events;
	} catch (err) {
		return err;
	}
};

export const getSimilarEvents = async (credentials) => {
	try {
		const events = await axios.get(getSimilarEventsURl, credentials);
	} catch (err) {}
};

export const registerUser = async (credentials) => {
	try {
		const status = await axios.post(registerUserURL, credentials);
		return status.data.message;
	} catch (err) {
		console.error(err);
	}
};

export const checkIfRegistered = async (credentials) => {
	try {
		const status = await axios.post(checkIfRegisteredURL, credentials);
		return status.data.message;
	} catch (err) {
		console.error(err);
	}
};

export const cancelEvent = async (credentials) => {
	try {
		const status = await axios.post(cancelEventURL, credentials);
		return status.data.message;
	} catch (err) {
		console.log(err);
	}
};

export const updateSkill = async (id, skill) => {
	try {
		console.log(id, skill);
		const message = await axios.put(updateSkillURL, {
			id: id,
			skill: skill,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getExtCollegeEvents = async () => {
	try {
		const response = await axios.get(getExtCollegeEventsURL);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
