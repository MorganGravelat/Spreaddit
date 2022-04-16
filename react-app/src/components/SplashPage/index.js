import PostsList from '../PostList';
import SpreadsList from '../SpreadList';
import { useSelector, useDispatch } from "react-redux";
import './style/splash-page.css';

const SplashPage = () => {
    const currentUser = useSelector((state) => state.session.user)

    return (
        <div className="splash-page-container">
            <div className='splash-page-header-container'>
                {currentUser ? <SpreadsList/> : <h1>HEYO</h1>}
            </div>
            <PostsList />
        </div>
    )
};

export default SplashPage;
