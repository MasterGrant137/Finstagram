import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Footer from '../Footer/Footer';
import './auth_css/Auth.css';
import './auth_css/SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page'>
      <form onSubmit={onSignUp} id='signup-form' className='auth-form' autoComplete='off'>
        <div id="signup-logo-div" className='auth-logo-div'>
          <span className='auth-logo'>Finstagram</span>
        </div>
        <div className='outer-signup-form-ele'>
          <input
            type='text'
            onChange={updateUsername}
            value={username}
            aria-label='Username'
            placeholder='Username'
            ></input>
        </div>
        <div className='outer-signup-form-ele'>
          <input
            type='email'
            onChange={updateEmail}
            value={email}
            aria-label='Email'
            placeholder='user@example.com'
            ></input>
        </div>
        <div className='outer-signup-form-ele'>
          <input
            type='password'
            onChange={updatePassword}
            value={password}
            aria-label='Password'
            placeholder='Password'
            ></input>
        </div>
        <div className='outer-signup-form-ele'>
          <input
            type='password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            aria-label='Repeat Password'
            placeholder='Repeat Password'
            ></input>
        </div>
        <div className='auth-button-div'>
          <button id='signup-button' className='inner-form-ele' type='submit'>Sign Up</button>
        </div>
        <div id='signup-errors-div' className='auth-errors-div'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SignUpForm;
