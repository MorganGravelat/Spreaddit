import { isFriendCheck, addFriend, getFriendInfo } from "../../../store/friend";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";

function Friends({user_id, post_user_id, currentUser}) {

    const dispatch = useDispatch();
    let friendinfo = useSelector((state) => state.friend?.friendinfo?.friendinfo)
    const FriendCheck = useSelector((state) => state?.friend?.check[0]);
    let decider = true;
    if (FriendCheck === "False") {
        decider = false;
    }
    if (FriendCheck === "True") {
        decider = true;
    }
    const add_friend = () => {
        if (!currentUser) {
            return false;
        }
        if (parseInt(user_id) === parseInt(post_user_id)) {
            return false;
        }
        if (decider) {
            return false;
        }
        return true;
    }
    const handleAdd = () => {
            // e.preventDefault();
            const payload = {
                requestee_id: post_user_id,
                requester_id: user_id
            };
            let createdPost;
            createdPost = dispatch(addFriend(payload));
            if (createdPost) {
                decider = true;
            }
    };
    useEffect(()=> {
        dispatch(isFriendCheck({'user_id':user_id, 'friend_id':post_user_id}))
        dispatch(getFriendInfo(post_user_id))

    }, [dispatch, post_user_id, user_id])


    return (
            <>
                {add_friend() ? (<><NavLink className='profile-button-navlink' to="/profile-page"><div onClick={() => {handleAdd();}} className="Delete-confirm-btn">Add Friend!</div></NavLink><h1>{`Posted by ${friendinfo?.full_name}`}</h1></>) : <><h1>{`Posted by ${friendinfo?.full_name}`}</h1></>}
            </>
        );

    };
    export default Friends;
