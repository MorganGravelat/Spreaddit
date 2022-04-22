import PostsList from '../PostList';
import SpreadsList from '../SpreadList';
import { useSelector } from "react-redux";
import './style/splash-page.css';

const SplashPage = () => {
    const currentUser = useSelector((state) => state.session.user)

    return (
        <div className="splash-page-container">
            <div className="spreads-splash-div">
              <h2>Some of your spreads!</h2>
              <h6>View them all in your profile!</h6>
            </div>
            <div className='splash-page-header-container'>
                {currentUser ? <SpreadsList/> : <h1>HEYO</h1>}
            </div>
            <div className="white-line-splash" />
            <div className="posts-splash-div">
              <h2>All Posts</h2>
            </div>
            <PostsList />
        </div>
    )
};

export default SplashPage;
