import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, editFriend } from '../../../store/friend';
import { removeFriend } from "../../../store/spread";

const FriendCard = ({friend}) => {
    const currentUser = useSelector((state) => state?.session?.user);
    //const friends = useSelector((state) => state?.friend?.friends)
    let user_id = currentUser?.id
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getFriends(user_id))
    // }, [dispatch]);
    // function dispatcher() {
    //     dispatch(getFriends(user_id))
    // }
    function unFriend() {
        let payload
        if (friend.type === "requestee" || friend.type === "nrequestee") {
            payload = {
                'user_id': user_id,
                'requeste_id': friend.friend_id
            }
        }
        if (friend.type === "requester" || friend.type === "nrequester") {
            payload = {
                'user_id': user_id,
                'requestr_id': friend.friend_id
            }
        }
        dispatch(deleteFriend(payload))
        let PayloadTwo = {
            'user_id': user_id,
            'friend_id': friend.friend_id
        }
        dispatch(removeFriend(PayloadTwo))

    }
    function acceptFriend(friend) {
        let payload
        payload = {
            'user_id': user_id,
            'friend_id': friend.friend_id,
        }
        dispatch(editFriend(payload))
    }

    return (
            <>
                <div className="grey-line-friends" />
                <div className="friend-info-div">
                    <div className="friend-interiorinfo-div">
                        <div className="profile-name-div">
                            <img alt={friend.friend_id}src={`${friend?.friend_image_url}`} />
                        </div>
                        <h1>{friend.friend_username}</h1>
                    </div>
                { friend.type === "requester" || friend.type === "requestee" ? (<div className="unfriend-button-div">
                            <button className="remove-friend-button friend-button" onClick={() => {unFriend();}}>Unfriend</button>
                    </div>) : (<></>)
                }
                { friend.type === "nrequester" ? (<div className="unfriend-button-div">
                            <button className="deny-request-button friend-button" onClick={() => {unFriend();}}>Deny Request</button>
                            <button className="accept-request-button friend-button" onClick={() => {acceptFriend(friend);}}>Accept Request</button>
                    </div>) : (<></>) }
                { friend.type === "nrequestee" ? (<div className="unfriend-button-div">
                        <button className="cancel-request-button  friend-button" onClick={() => {unFriend();}}>Cancel Request</button>
                </div>) : (<></>) }
                </div>
            </>
    )
    }


export default FriendCard;
