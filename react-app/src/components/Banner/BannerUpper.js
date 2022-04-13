import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './style/banner-style.css'

const BannerUpper = () => {
    const user = useSelector(state => state.session.user);

    let links;
    if (user) {
        links = (
            <div className='banner-right-button-container'>
                <LogoutButton />
            </div>
        )
    } else {
        links = (
            <div className='banner-right-button-container'>
                <NavLink to="/login">
                    <div className='banner-search nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
                <NavLink to="/sign-up">
                    <div className='nav-button'>
                        <p>&nbsp;Sign Up</p>
                    </div>
                </NavLink>
            </div>
        )
    }

    return (
        <div
            className='banner-upper-container'
        >
            {/* TODO : Add link paths to nav buttons */}
            <NavLink exact to="/">
                <div>
                    <p>Spreaddit</p>
                </div>
            </NavLink>
            {links}
            {/* <div className='banner-right-button-container'>
                <NavLink to="">
                    <div className='banner-search nav-button'>
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink to="/login">
                    <div className='banner-search nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
                <NavLink to="/sign-up">
                    <div className='nav-button'>
                        <p>&nbsp;Sign Up</p>
                    </div>
                </NavLink>
            </div> */}
        </div>
    )
};

export default BannerUpper;
