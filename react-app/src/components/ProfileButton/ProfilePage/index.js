import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfilePage.css"

const ProfilePage = () => {
    const currentUser = useSelector((state) => state?.session?.user);

    return (
      <div className='profile-page-container'>
          <div className="profile-title-div">
              <h1>{`${currentUser?.full_name}`}</h1>
          </div>
          <div className="profile-image-div">
              <img src={`${currentUser?.image_url}`}></img>
          </div>
          <div className="friends-label-div">
              <h2>Friends</h2>
          </div>
          <div className="white-line-profile" />
          <div className="friends-list-div">
            <div className="grey-line-friends" />
            <div className="friend-info-div">
                <div className="friend-interiorinfo-div">
                    <div classname="profile-name-div">
                        <img src={`${currentUser?.image_url}`} />
                    </div>
                </div>
                <div className="unfriend-button-div">
                        <button>Unfriend</button>
                </div>
            </div>
          </div>
      </div>
    );
};

export default ProfilePage;
