import { getFriends } from '../../../store/friend';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserSpreadPosts, addSpreadPost, addSpreadUser, deleteSpreadUser, removeSpreadUserPost } from '../../../store/spread';
import { isOnSpreadCheck } from '../../../store/friend';


const SpreadFriends = ({spreadId, spread}) => {
    const history = useHistory();
    const currentUser = useSelector((state) => state?.session?.user);
    let user_id = currentUser?.id
    let owner_id = spread?.user_id
    let spread_id = spreadId
    const dispatch = useDispatch();
    const friends = useSelector((state) => state?.friend?.friends)
    const friendsposts = useSelector((state) => state?.spread?.userspreaded)
    const getchecked = useSelector((state) => state?.friend?.spreadcheck)
    console.log(friendsposts,getchecked, "HEYO ITS ME FRIENDS POSTS AND GETCHECKED")
    let friendInfoArr = [];
    let friendsArr;
    function FriendInfoArr() {
        friendsArr = Object.values(friends)
        friendInfoArr = [];
        friendInfoArr.push({'friend_username': '-please pick a friend-', 'friend_id': 0})
        for (let i = 0; i < friendsArr.length; i++) {
            let ele = friendsArr[i];
            if (ele.accepted === true) {
                if (parseInt(ele.requestee_id) === parseInt(user_id)) {
                    friendInfoArr.push({'friend_username': ele.requester_username, 'friend_id': ele.requester_id, 'id': ele.id})
                }
                if (parseInt(ele.requester_id) === parseInt(user_id)) {
                    friendInfoArr.push({'friend_username': ele.requestee_username, 'friend_id': ele.requestee_id, 'id': ele.id})
                }
            }
        }
        return FriendInfoArr;
    }
    FriendInfoArr();

    console.log(friendInfoArr[0], "HEYO ITR FRIEND INFO ARR")
    //const [decisioner, setDecisioner] = useState(false);
    const [friendId, setFriendId] = useState(0);
    const updateFriend = (e) => setFriendId(e.target.value);
    useEffect(() => {
        dispatch(getFriends(user_id))
        dispatch(getUserSpreadPosts(friendId))
        dispatch(isOnSpreadCheck({spread_id, 'user_id':friendId}))

    }, [dispatch, user_id, friendId, spreadId, spread_id]);
    // useEffect(() => {
    //     console.log(friendId, 'MY FREND HAHAHAHAAH');

    // }, [friendId]);
    // let OptionItems = friendInfoArr.map((friend) =>
    //     <option key={friend.friend_id} value={friend.friend_id}>{friend.friend_username}</option>
    // );
    const onSubmit = () => {
        if (friendId === 0) {
            window.alert("Please pick a friend to add to spread.");
            return;
        }
        let spreadU = {
            spread_id,
            user_id: friendId
        }
        dispatch(addSpreadUser(spreadU))
        let postIdArr = [];
        Object.values(friendsposts).forEach(post => {
            let id = post.post_id
            if (!postIdArr.includes(parseInt(id))) {
                postIdArr.push(parseInt(id))
            }
        });
        console.log(postIdArr, 'THIS IS POST ID ARR')
        for (let i = 0; i < postIdArr.length; i++) {
            let post_id = postIdArr[i];
            let payload = {
                spread_id,
                post_id,
                user_id: friendId,
            }
            dispatch(addSpreadPost(payload))
        }
        //history.push("/profile-page");
        history.push(`/profile-page`);
        //dispatch(getSpreadPosts(spreadId));
        //setDecisioner(true);

    }
    const onRemoveSubmit = () => {
        if (friendId === 0) {
            window.alert("Please pick a friend to add to spread.");
            return;
        }
        let spreadU = {
            spread_id,
            'id': friendId,
        }
        dispatch(deleteSpreadUser(spreadU))
        let payload = {
            spread_id,
            user_id: friendId,
        }
        dispatch(removeSpreadUserPost(payload))
        console.log('IT WORKED??????')
        // history.push("/profile-page");
        history.push(`/profile-page`);
        //dispatch(getSpreadPosts(spreadId));
        //setDecisioner(false);

    }
    if (Object.values(getchecked).length) {
        //setDecisioner(true);
    }
    else {
        //setDecisioner(false);
    }
    if (!(user_id === owner_id)) return (<></>)
    return (
        <div>
        {friendInfoArr.length ? (<><select onChange={updateFriend}>
                {friendInfoArr.map((friend) =>
                    <option key={friend.friend_id} value={friend.friend_id}>{friend.friend_username}</option>)}
            </select>{Object.values(getchecked).length ?
            <button onClick={onRemoveSubmit}>Remove Friend From Spread</button> :
            <button onClick={onSubmit}>Add Friend To Spread</button>}
            </>) : <></>}
        </div>
    )

}

export default SpreadFriends;
