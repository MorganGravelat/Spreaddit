import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/session';

const LogoutButton = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const onLogout = async (e) => {
    await dispatch(logout());
      history.push(`/`)
    };

    // return <button onClick={onLogout}>Logout</button>;
    return (
       <div className='banner-logout nav-button'
         onClick={onLogout}>
         <p className="log-out-button">Log Out</p>
       </div>
    )
};

export default LogoutButton;
