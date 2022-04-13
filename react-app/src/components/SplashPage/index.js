import PostsList from '../PostList';
import './style/splash-page.css';

const SplashPage = () => {
    return (
        <div className="splash-page-container">
            <div className='splash-page-header-container'>
                <p className='splash-page-header'>
                    Spread the news you want to see
                </p>
            </div>
            <PostsList />
        </div>
    )
};

export default SplashPage;
