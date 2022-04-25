import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import FooterComponent from '../SplashPage/footer';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [image_url, setImage_Url] = useState('https://i.imgur.com/GiMu19G.png');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

//   useEffect(() => {
//     let errors = [];
//     if (username.length <= 0 || username.length > 40) {
//       if (title.length === 0 || title.length > 20) errors.push('Please enter a value for title between 1 - 20 characters.')
//     }
//     if (!title) errors.push('Please enter a value for Title.')
//     if (post) {
//         if (post.length === 0 || title.length > 200) errors.push('Please enter a value for post between 1 - 200 characters.')
//       }
//     if (!post) errors.push('Please enter a post.')
//     if (image_url) {
//       if (image_url.length > 255) errors.push('Image URL must be shorter than 255 characters.')
//     }
//     if (!image_url) errors.push('Please enter a URL for image_url.')
//     setErrors(errors);
//   }, [title, post, image_url])
    function emailValidator(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  const onSignUp = async (e) => {
    e.preventDefault();

    //error validation
    setErrors([])
    const newErrors = [];

    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.")
    }

    if (username.length <= 0 || username.length > 40) {
        newErrors.push('Your username must be between 1 and 40 characters in length')
    }

    if (email.length <= 0 || username.length > 100) {
        newErrors.push('Your username must be between 1 and 100 characters in length')
    }

    if (!emailValidator(email) || email.includes('@@')) {
        newErrors.push('Your email address is invalid')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return;
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, full_name, image_url, password));
      if (data) {
        setErrors(data)
      }
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFull_Name = (e) => {
    setFull_Name(e.target.value);
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
    <div className="form-container-div">
        <form className="signup-container-outer" onSubmit={onSignUp}>
        <h1 className='signup-h1'>Signup!</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-username-container signup-container'>
            <label className="label-signup" >User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              className='signup-username-input'
              required
            ></input>
          </div>
          <div className='signup-email-container signup-container'>
            <label className="label-signup" >Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className='signup-email-input'
              required
            ></input>
          </div>
          <div className='signup-fullname-container signup-container'>
            <label className="label-signup" >Full Name</label>
            <input
              type='text'
              name='full_name'
              onChange={updateFull_Name}
              value={full_name}
              className='signup-fullname-input'
              required
            ></input>
          </div>
          <div className='signup-password-container signup-container'>
            <label className="label-signup" >Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className='signup-password-input'
              required
            ></input>
          </div>
          <div className='signup-rpassword-container signup-container'>
            <label className="label-signup" >Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={confirmPassword}
              className='signup-rpassword-input'
              required={true}
            ></input>
          </div>
          <button className="signup-button" type='submit'>Sign Up</button>
        </form>
        <FooterComponent />
    </div>
  );
};

export default SignUpForm;
