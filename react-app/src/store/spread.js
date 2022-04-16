const LOAD = "spreads/LOAD"
const GET_POSTS = "spreads/GET_POSTS"
const GET_ONE = "spreads/GET_ONE"
const DELETE_ONE = "spreads/DELETE_ONE"
const ADD_ONE = "spreads/ADD_ONE"
const ADD_USER = "spread/ADD_USER"
const ADD_POST = "spread/ADD_POST"

const getOne = (spread) => ({
    type: GET_ONE,
    spread
})
const load = (spreads) => ({
    type: LOAD,
    spreads,
})
const deleteOne = (spreadId) => ({
    type: DELETE_ONE,
    spreadId,
})
const getPosts = (posts) => ({
    type: GET_POSTS,
    posts,
})
const addOne = (spread) => ({
    type: ADD_ONE,
    spread
})
const addUser = (spreadU) => ({
    type: ADD_USER,
    spreadU
})
const addPost = (spreadP) => ({
    type: ADD_POST,
    spreadP
})

export const getSpreads = (id) => async (dispatch) => {
    const response = await fetch(`/api/spreads/${id}`)
    if (response.ok) {
        const spreads = await response.json();
        dispatch(load(spreads))
        return spreads
    }
}

export const getSpreadPosts = (id) => async (dispatch) => {
    const response = await fetch(`/api/spreads/posts/${id}`)
    if (response.ok) {
        const spreads = await response.json();
        dispatch(getPosts(spreads))
        return spreads
    }
}

export const getSpread = (id) => async (dispatch) => {
    const response = await fetch(`/api/spreads/single/${id}`)
    if (response.ok) {
        const spread = await response.json();
        dispatch(getOne(spread))
        return spread
    }
}

export const deleteSpread = (spread) => async (dispatch) => {
    const response = await fetch(`/api/spreads/delete/${spread.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spread),
    });
    if (response.ok) {
        const spreadId = await response.json();
        console.log("MYSPREADID", spreadId)
        dispatch(deleteOne(spreadId))
        return spreadId;
    }
}

export const addSpread = (spread) => async (dispatch) => {
    const response = await fetch(`/api/spreads/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spread),
    });
    if (response.ok) {
        const spread = await response.json();
        dispatch(addOne(spread))
        return spread
    }
}

export const addSpreadUser = (spreadU) => async (dispatch) => {
    const response = await fetch(`/api/spreads/create/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spreadU),
    });
    if (response.ok) {
        const spreadU = await response.json();
        dispatch(addUser(spreadU))
        return spreadU
    }
}

export const addSpreadPost = (spreadP) => async (dispatch) => {
    const response = await fetch(`/api/spreads/create/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spreadP),
    });
    if (response.ok) {
        const spreadP = await response.json();
        dispatch(addPost(spreadP))
        return spreadP
    }
}

const initialState = {
    spreads: {},
    selected: {},
    posts: {}
}

const spreadReducer = (state = initialState, action) => {
    let setState
    switch (action.type) {
        case LOAD:
            let allSpreads = {};
            action.spreads.spreads.forEach((spread) => {
                allSpreads[spread.id] = spread
            })
            return { ...state, spreads: allSpreads }
        case GET_ONE:
            setState = {...state, selected: { [action.spread.id]: {...action.spread}}}
            return setState
        case GET_POSTS:
            let allPosts = {};
            action.posts.posts.forEach((spread) => {
                allPosts[spread.id] = spread
            })
            return { ...state, posts: allPosts }
        case ADD_ONE:
            setState = {...state, spreads: {...state.spreads, [action.spread.id]: action.spread}}
            return setState
        case DELETE_ONE:
            setState = {...state, spreads: {...state.spreads}}
            delete setState.spreads[action.spreadId.id];
            return setState
        case ADD_USER:
            return state;
        case ADD_POST:
            return state;
        default:
            return state;
    }
}

export default spreadReducer
