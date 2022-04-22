import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFriends } from '../../../store/friend';
import FriendCard from "../FriendCard";
import ProfileSpreadList from "../ProfileSpreadList";
import "./ProfilePage.css"


const ProfilePage = () => {
    const currentUser = useSelector((state) => state?.session?.user);
    let user_id = currentUser?.id
    const friends = useSelector((state) => state?.friend?.friends)
    const dispatch = useDispatch();
    let friendInfoArr = [];
    let notfriendInfoArr = [];
    let friendsArr;
    function FriendInfoArr() {
        friendsArr = Object.values(friends)
        friendInfoArr = [];

        for (let i = 0; i < friendsArr.length; i++) {
            let ele = friendsArr[i];
            if (ele.accepted === true) {
                if (parseInt(ele.requestee_id) === parseInt(user_id)) {
                    friendInfoArr.push({'type':'requester','friend_image_url': ele.requester_image_url, 'friend_username': ele.requester_username, 'friend_id': ele.requester_id})
                }
                if (parseInt(ele.requester_id) === parseInt(user_id)) {
                    friendInfoArr.push({'type':'requestee','friend_image_url': ele.requestee_image_url, 'friend_username': ele.requestee_username, 'friend_id': ele.requestee_id})
                }
            }
            if (ele.accepted === false) {
                if (parseInt(ele.requestee_id) === parseInt(user_id)) {
                    notfriendInfoArr.push({'type':'nrequester','friend_image_url': ele.requester_image_url, 'friend_username': ele.requester_username, 'friend_id': ele.requester_id})
                }
                if (parseInt(ele.requester_id) === parseInt(user_id)) {
                    notfriendInfoArr.push({'type':'nrequestee','friend_image_url': ele.requestee_image_url, 'friend_username': ele.requestee_username, 'friend_id': ele.requestee_id})
                }
            }
        }
        return FriendInfoArr;
    }
    FriendInfoArr();
    useEffect(() => {
        dispatch(getFriends(user_id))
    }, [dispatch, user_id]);


    return (
      <div className='profile-page-container'>
          <div className="profile-title-div">
              <h1>{`${currentUser?.full_name}`}</h1>
          </div>
          <div className="profile-image-div">
              <img alt={currentUser?.full_name} src={`${currentUser?.image_url}`}></img>
          </div>
          <div className="friends-label-div">
              <h2>Friends</h2>
          </div>
          <div className="white-line-profile" />
          <div className="friends-list-div">
            <>
                {friendInfoArr.map((friend) => (<FriendCard key={friend?.friend_id} friend={friend} />))}
            </>
            <div className="grey-line-friends" />
          </div>
          <div className="spreads-label-div">
              <h2>Pending Requests</h2>
          </div>
          <div className="white-line-profile" />
          <div className="friends-list-div">
            <>
                {notfriendInfoArr.map((friend) => (<FriendCard key={friend?.friend_id} friend={friend} />))}
            </>
            <div className="grey-line-friends" />
          </div>
          <div className="spreads-label-div">
              <h2>Spreads</h2>
          </div>
          <div className="white-line-profile" />
          <ProfileSpreadList />
      </div>
    );
};

export default ProfilePage;
