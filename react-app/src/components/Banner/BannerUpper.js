import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from '../ProfileButton';
import './style/banner-style.css'

const BannerUpper = () => {
    const user = useSelector(state => state.session.user);

    const showCreateButton = (user) => {
        if (user) {
            return (
                <div className="create-button-div">
                    <NavLink to="/create-post">
                        <div className='banner-create-post nav-button'>
                            <p>Create a post</p>
                        </div>
                    </NavLink>
                    <NavLink to="/create-spread">
                        <div className='banner-create-post nav-button'>
                            <p>Create a spread</p>
                        </div>
                    </NavLink>
                </div>
            )
        }
        else { return null }
    }

    let links;
    if (user) {
        links = (
            <div className="banner-right-side">
                <NavLink className='profile-button-navlink' to="/profile-page">
                    <ProfileButton />
                </NavLink>
                <LogoutButton />
            </div>
        )
    } else {
        links = (
            <div className='banner-right-button-container'>
                <NavLink to="/login">
                    <div className='banner-login nav-button'>
                        <p>Login</p>
                    </div>
                </NavLink>
                <NavLink to="/sign-up">
                    <div className='banner-signup nav-button'>
                        <p>&nbsp;Sign Up</p>
                    </div>
                </NavLink>
            </div>
        )
    }

    return (
        <div
            className={ user ? 'banner-upper-container' : 'banner-upper-container-loggedout'}
        >
            <div className='banner-left-side-div'>
                {showCreateButton(user)}
            </div>
            <div className="logo-button-div">
                <NavLink className="logo-button" exact to="/">
                    <div>
                        <img alt='spreaddit-logo' src="https://i.imgur.com/1COJnSi.png" className="spreaddit-logo"></img>
                    </div>
                </NavLink>
            </div>
            {links}
        </div>
    )
};

export default BannerUpper;
