const LOAD = "posts/LOAD"
const ADD_ONE = "posts/ADD_ONE"
const GET_ONE = "posts/GET_ONE"
const EDIT_ONE = "posts/EDIT_ONE"
const DELETE_ONE = "posts/DELETE_ONE"

const load = (posts) => ({
    type: LOAD,
    posts,
})
const getOne = (post) => ({
    type: GET_ONE,
    post
})
const addOne = (post) => ({
    type: ADD_ONE,
    post
})
const deleteOne = (postId) => ({
    type: DELETE_ONE,
    postId,
})

const editOne = (post) => ({
    type: EDIT_ONE,
    post
})

export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts`)
    if (response.ok) {
        const posts = await response.json();
        dispatch(load(posts))
        return posts
    }
}

export const getPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`)
    if (response.ok) {
        const post = await response.json();
        dispatch(getOne(post))
        return post
    }
}

export const addPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    if (response.ok) {
        const post = await response.json();
        dispatch(addOne(post))
        return post
    }
}

export const editPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/edit/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const editPost = await response.json();
        dispatch(editOne(editPost))
        return editPost;
    }
}

export const deletePost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/delete/${post.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    if (response.ok) {
        const postId = await response.json();
        dispatch(deleteOne(postId))
        return postId;
    }
}


const initialState = {
    posts: {},
    selected: {}
}

const postReducer = (state = initialState, action) => {
    let setState
    switch (action.type) {
        case LOAD:
            let allPosts = {};
            action.posts.posts.forEach((post) => {
                allPosts[post.id] = post
            })
            return { ...state, posts: allPosts }
        case ADD_ONE:
            setState = {...state, posts: {...state.posts, [action.post.id]: action.post}}
            return setState
        case GET_ONE:
            setState = {...state, selected: { [action.post.id]: {...action.post}}}
            return setState
        case EDIT_ONE:
            setState = {...state, posts: {...state.posts, [action.post.id]: action.post}, selected: {...state.selected}}
            return setState
        case DELETE_ONE:
            setState = {...state, posts: {...state.posts}, selected: {...state.selected}}
            delete setState.posts[action.postId.id];
            return setState
        default:
            return state;
    }
}

export default postReducer
