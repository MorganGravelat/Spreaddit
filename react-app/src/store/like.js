import { StaticRouter } from "react-router-dom"

const LOAD = "likes/LOAD"
const LOAD_COMMENT_LIKES = "likes/LOAD_COMMENT_LIKES"
const USER_like_LIKES = "likes/USER_like_LIKES"
const HAS_LIKED_like = "likes/HAS_LIKED_like"
const ADD_ONE = "likes/ADD_ONE"
const EDIT_ONE = "likes/EDIT_ONE"
const DELETE_ONE = "likes/DELETE_ONE"


const load = (likes) => ({
    type: LOAD,
    likes,
})
const addALike = (like) => ({
    type: ADD_ONE,
    like
})
const editALike = (like) => ({
    type: EDIT_ONE,
    like
})
const deleteOne = (likeInfo) => ({
    type: DELETE_ONE,
    likeInfo
})
const likeliked = (liketurn) => ({
    type: HAS_LIKED_like,
    liketurn,
})
const userlikeLike = (Ulikes) => ({
    type: USER_like_LIKES,
    Ulikes
})
const loadPLikes = (likes) => ({
    type: LOAD,
    likes,
})

const like = (like) => ({
    type: ADD_ONE,
    like
})

// const unlike = () => ({
//     type: REMOVE_ONE,
// })


export const getPostLikes = () => async (dispatch) => {
    const response = await fetch(`/api/likes/`)
    if (response.ok) {
        const likes = await response.json();
        dispatch(load(likes))
        return likes
    }
}

export const addLike = (like) => async (dispatch) => {
    const response = await fetch(`/api/likes/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
    });
    if (response.ok) {
        const like = await response.json();
        dispatch(addALike(like))
        return like
    }
}

export const editLike = (like) => async (dispatch) => {
    const response = await fetch(`/api/likes/edit/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
    });
    if (response.ok) {
        const like = await response.json();
        dispatch(editALike(like));
        return like
    }
}

export const deleteLike = (like) => async (dispatch) => {
    const response = await fetch(`/api/likes/delete/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
    });
    if (response.ok) {
        const likeInfo = await response.json();
        dispatch(deleteOne(likeInfo))
        return likeInfo;
    }
}

export const userPostLikes = (user_id) => async(dispatch) => {
    const response = await fetch(`/api/likes/${user_id}/`)
    if (response.ok) {
        const Ulikes = await response.json();
        console.log(Ulikes, 'LET US SEE Ulikes');
        dispatch(userlikeLike(Ulikes))
        return Ulikes
    }

}

const initialState = {
    Plikes: {},
    Clikes: {},
    Pliked: false,
    Ulikes: {}
}

const likeReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD:
            newState = {...state, Plikes: action.likes,}
            return newState
        case HAS_LIKED_like:
            newState = {...state, Pliked: action.liketurn}
            return newState;
        case USER_like_LIKES:
            newState = {...state, Ulikes: action.Ulikes}
            return newState;
        case ADD_ONE:
            newState = {...state}
            console.log(action.like, newState, 'THIS IS ACTION.LIKE AND NEW STATE BACK TO BACK')
            if (action?.like?.post_id in newState.Plikes) {
                newState.Plikes['post_id'] += action?.like?.liked
            }
            else {
                newState.Plikes[action?.like?.post_id] = action?.like?.liked
            }
        case EDIT_ONE:
            newState = {...state};
            if (action?.likeInfo?.liked === 1) newState.Plikes[action?.likeInfo?.post_id] += 2
            if (action?.likeInfo?.liked === -1) newState.Plikes[action?.likeInfo?.post_id] += -2
            return newState;
        case DELETE_ONE:
            newState = {...state};
            newState.Plikes[action.likeInfo.post_id] -= action.likeInfo.liked
            return newState;
        default:
            return state;
    }
}

export default likeReducer
