const LOAD = "friends/LOAD"
const DELETE_ONE = "friends/DELETE_ONE"
const IS_FRIEND = "friends/IS_FRIEND"
const ADD_ONE = "friends/ADD_ONE"
const EDIT_ONE = "friends/EDIT_ONE"
const SPREAD_CHECK = "friends/SPREAD_CHECK"

const load = (friends) => ({
    type: LOAD,
    friends,
})

const deleteOne = (friendId) => ({
    type: DELETE_ONE,
    friendId,
})

const addOne = (friend) => ({
    type: ADD_ONE,
    friend
})

const isFriend = (isFriendRes) => ({
    type: IS_FRIEND,
    isFriendRes
})

const editOne = (editFriend) => ({
    type: EDIT_ONE,
    editFriend
})

const spreadCheck = (check) => ({
    type: SPREAD_CHECK,
    check
})

export const getFriends = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/friends/${user_id}`)
    if (response.ok) {
        const friends = await response.json();
        dispatch(load(friends))
        return friends
    }
}

export const addFriend = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
    });
    if (response.ok) {
        const friend = await response.json();
        dispatch(addOne(friend))
        return friend
    }
}

export const deleteFriend = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
    });
    if (response.ok) {
        const friendId = await response.json();
        dispatch(deleteOne(friendId))
        return friendId;
    }
}

export const isFriendCheck = (twoIds) => async (dispatch) => {
    const response = await fetch(`/api/friends/check/${twoIds.user_id}/${twoIds.friend_id}`)
    if (response.ok) {
        const isFriendRes = await response.json();
        dispatch(isFriend(isFriendRes))
        return isFriendRes
    }
}

export const isOnSpreadCheck = (spreadUserId) => async (dispatch) => {
    const response = await fetch(`/api/friends/check/spread/${spreadUserId.user_id}/${spreadUserId.spread_id}/`)
    if (response.ok) {
        const isOnSpread = await response.json();
        dispatch(spreadCheck(isOnSpread))
        return isOnSpread
    }
}

export const editFriend = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend)
    });
    if (response.ok) {
        const editFriend = await response.json();
        dispatch(editOne(editFriend))
        return editFriend;
    }
}



const initialState = {
    friends: {},
    check: {},
    spreadcheck: {},
}

const friendReducer = (state = initialState, action) => {
    let setState
    switch (action.type) {
        case LOAD:
            setState = {...state, friends: {...state.friends}}
            let allFriends = {};
            action?.friends?.friends.forEach((friend) => {
                allFriends[friend?.id] = friend
            })
            setState.friends = allFriends
            return setState
        case EDIT_ONE:
            setState = {...state, friends: {...state.friends, [action.editFriend.id]: action.editFriend}}
            return setState
        case ADD_ONE:
            setState = {...state, friends: {...state.friends, [action.friend.id]: action.friend}}
            return setState
        case DELETE_ONE:
            setState = {...state, friends: {...state.friends}}
            delete setState?.friends[action?.friendId?.id];
            return setState
        case IS_FRIEND:
            setState = {...state, check: [action.isFriendRes]}
            return setState
        case SPREAD_CHECK:
            console.log(action.check, 'THE CHECK MAN!')
            setState = {...state, spreadcheck: {...action.check.posts}}
            return setState
        default:
            return state;
    }
}

export default friendReducer
