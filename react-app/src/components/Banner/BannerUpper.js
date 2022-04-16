import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './style/banner-style.css'

const BannerUpper = () => {
    const user = useSelector(state => state.session.user);

    const showCreateButton = (user) => {
        if (user) {
            return (
                <>
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
                </>
            )
        }
        else { return null }
    }

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
            <div className='banner-left-side-div'>
                <NavLink exact to="/">
                    <div>
                        <p className="spreaddit-logo">Spreaddit</p>
                    </div>
                </NavLink>
                {showCreateButton(user)}
                {links}
            </div>
        </div>
    )
};

export default BannerUpper;
