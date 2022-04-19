const LOAD = "friends/LOAD"
const DELETE_ONE = "friends/DELETE_ONE"

const load = (friends) => ({
    type: LOAD,
    friends,
})

const deleteOne = (friendId) => ({
    type: DELETE_ONE,
    friendId,
})

export const getFriends = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/friends/${user_id}`)
    if (response.ok) {
        const friends = await response.json();
        dispatch(load(friends))
        return friends
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



const initialState = {
    friends: {},
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
        case DELETE_ONE:
            setState = {...state, friends: {...state.friends}}
            delete setState?.friends[action?.friendId?.id];
            return setState
        default:
            return state;
    }
}

export default friendReducer
