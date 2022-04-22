import PostsList from '../PostList';
import SpreadsList from '../SpreadList';
import { useSelector } from "react-redux";
import FooterComponent from './footer';
import './style/splash-page.css';

const SplashPage = () => {
    const currentUser = useSelector((state) => state.session.user)

    if (currentUser) {
        return (
            <div className="splash-page-container">
                {currentUser ? <SpreadsList/> : <h1>HEYO</h1>}
                <div className="white-line-splash" />
                <div className="posts-splash-div">
                  <h2>All Posts</h2>
                </div>
                <PostsList />
                <FooterComponent />
            </div>
        )
    }
    return (
        <div className="logout-body">
            <div className="splash-page-container-heropage">
                <img className="spreaddit-logo-img" alt="spreaddit-logo" src="https://drive.google.com/uc?id=1iE8yMCs9JNDmu74tVft9w5bfnj6-AFmH" />
                <h1>Spreaddit</h1>
                <p className="spreaddit-app-description">A unique social experience where users can choose to browse all posts, or create a 'spread' for themselves and any friend who is added to it.
                Adding a friend is done through viewing a post made by them and hitting the add friend button.
                Spreads allow users to curate specific pages of posts that draw from the users added to that post. Added users will be able to hit the spread button under any post and spread it to every
                spread they are added to or own.
                </p>
            </div>
            <div className="splash-page-container-logout">
            <PostsList />
            </div>
            <FooterComponent />
        </div>
    )
};

export default SplashPage;
