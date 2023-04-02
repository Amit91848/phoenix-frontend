import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SignUpPage from '../Images/SignUpPage.jpeg';
import { signup } from "../service/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft, faApple } from '@fortawesome/free-brands-svg-icons';
import Switch from 'react-switch';

function SignUp() {
  const [ toggle, setToggle ] = useState(false);
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '', isUser: true })
  const [emailValid, setEmailValid] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(true);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(credentials);
    navigate('/login');
  }

  const handleToggle = (e) => {
    setToggle(!toggle);
    setCredentials({
      ...credentials,
      isUser: toggle
    });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    if (
      e.target.name === "email" &&
      e.target.value.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    ) {
      setEmailValid(true);
    }

    if (e.target.name === 'confirmPassword') {
      setPasswordMatching(false);
      if (e.target.value === credentials.password || e.target.value === '') {
        setPasswordMatching(true);
      }
    }
  }
  return (
    <div className="flex">
      <div className="flex justify-center items-center w-1/2 h-screen">

        <div className="flex flex-col h-fit w-4/5 items-center ">
          <div className="font-Segoe text-4xl font-light drop-shadow-[0px_3px_6px_#00000029]">Welcome to Phoenix !</div>

          <div className="flex justify-between mt-4 w-2/4">
            <div className="text-segoe">Client</div>
            <div className="text-seoge"> <Switch uncheckedIcon={false} checkedIcon={false} checked={toggle} onChange={handleToggle} onColor={'#13c0d7'}/> </div>
            <div className="text-seoge">Organisation</div>
          </div>

          <div className="flex flex-col mt-10">
            <div className="text-lightGrey text-sm">Continue With</div>
            <div className="flex justify-between w-full mt-2">
              <FontAwesomeIcon className="text-2xl hover:cursor-pointer" icon={faGoogle} />
              <FontAwesomeIcon className="text-2xl hover:cursor-pointer" icon={faMicrosoft} />
              <FontAwesomeIcon className="text-2xl hover:cursor-pointer" icon={faApple} />
            </div>
          </div>

          <div className="flex justify-between w-full items-center mt-4">
            <div className="border-solid bg-lightGrey opacity-40 w-full h-px"></div>
            <div className="text-sm mx-2 opacity-70">OR</div>
            <div className="border-solid bg-lightGrey opacity-40 w-full h-px"></div>
          </div>

          <div className="flex w-9/12 flex-col justify-between item-center mt-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              className="border border-darkGrey opacity-60 placeholder:text-sm pl-4 rounded-lg p-1 h-10"
              required
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="border border-darkGrey opacity-60 mt-5 placeholder:text-sm pl-4 rounded-lg p-1 h-10"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="border border-darkGrey opacity-60 placeholder:text-sm pl-4 rounded-lg p-1 h-10 mt-5"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              className="border border-darkGrey opacity-60 mt-5 placeholder:text-sm pl-4 rounded-lg p-1 h-10"
              required
            />
          </div>
          {
            !passwordMatching && <div className="flex mt-3 text-sm border w-2/5 justify-center py-2 border-red-400 bg-red-200 rounded-lg font-GothamL">Passwords do not match</div>
          }

          <div className="flex w-3/5 mt-7">
            <button disabled={credentials.password.length <= 5 || !emailValid} onClick={handleSubmit} className="border bg-loginBlue w-full h-9 rounded-lg text-white text-sm">Create Account</button>
          </div>

          <div className="flex mt-3 w-9/12 text-sm justify-center">
            Already have an Account? <p className="text-loginBlue underline ml-2 hover:cursor-pointer"><Link to='/login'> Login </Link></p>
          </div>

          {
            !passwordMatching &&
            <div className="flex mt-3 text-sm">Passwords do not match</div>
          }
        </div>
      </div>

      <div className="w-1/2 h-screen">
        <img src={SignUpPage} alt="background" className="h-full w-full" />
      </div>
    </div>
  )
}

export default SignUp;
