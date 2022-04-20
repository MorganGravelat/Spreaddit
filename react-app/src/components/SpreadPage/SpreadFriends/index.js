import { getFriends } from '../../../store/friend';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";


const SpreadFriends = () => {
    const currentUser = useSelector((state) => state?.session?.user);
    let user_id = currentUser?.id
    const dispatch = useDispatch();
    const friends = useSelector((state) => state?.friend?.friends)
    let friendInfoArr = [];
    let friendsArr;
    function FriendInfoArr() {
        friendsArr = Object.values(friends)
        friendInfoArr = [];

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
    const [friendId, setFriendId] = useState(friendInfoArr[0]?.friend_id);
    const updateFriend = (e) => setFriendId(e.target.value);
    useEffect(() => {
        dispatch(getFriends(user_id))

    }, [dispatch, user_id, friendId]);
    useEffect(() => {
        console.log(friendId, 'MY FREND HAHAHAHAAH');

    }, [friendId]);
    // let OptionItems = friendInfoArr.map((friend) =>
    //     <option key={friend.friend_id} value={friend.friend_id}>{friend.friend_username}</option>
    // );
    return (
        <div>
            <select onChange={updateFriend}>
                {friendInfoArr.map((friend) =>
                    <option key={friend.friend_id} value={friend.friend_id}>{friend.friend_username}</option>)}
            </select>
        </div>
    )

}

export default SpreadFriends;
