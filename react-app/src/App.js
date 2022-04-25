import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostForm from './components/PostForm';
import PostPage from './components/PostPage';
import PostEdit from './components/PostEdit';
import { authenticate } from './store/session';
import Banner from './components/Banner/index';
import SplashPage from './components/SplashPage/index';
import SpreadPage from './components/SpreadPage';
import SpreadForm from './components/SpreadForm';
import ProfilePage from './components/ProfileButton/ProfilePage';
import SpreadEdit from './components/SpreadPage/SpreadEdit';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Banner />
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/create-post' exact={true}>
            <PostForm />
        </Route>
        <Route path='/create-spread' exact={true}>
            <SpreadForm />
        </Route>
        <Route path='/posts/:postId' exact={true}>
            <PostPage />
        </Route>
        <Route path='/spread/:spreadId' exact={true}>
            <SpreadPage />
        </Route>
        <Route path='/spread/edit/:spreadId' exact={true}>
            <SpreadEdit />
        </Route>
        {/* <Route path='/posts/:postId' exact={true}>
            <PostPage />
        </Route> */}
        <Route path="/posts/edit/:postId" exact={true}>
          <PostEdit />
        </Route>
        <Route path="/profile-page" exact={true}>
          <ProfilePage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
