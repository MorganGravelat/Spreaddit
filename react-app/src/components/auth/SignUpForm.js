import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [image_url, setImage_Url] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    //error validation
    setErrors([])

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, full_name, image_url, password));
      if (data) {
        setErrors(data)
      }
    }

    const newErrors = [];

    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return;
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFull_Name = (e) => {
    setFull_Name(e.target.value);
  };

  const updateImage_Url = (e) => {
    setImage_Url(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Full Name</label>
        <input
          type='text'
          name='full_name'
          onChange={updateFull_Name}
          value={full_name}
        ></input>
      </div>
      <div>
        <label>Image Url</label>
        <input
          type='text'
          name='image_url'
          onChange={updateImage_Url}
          value={image_url}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
