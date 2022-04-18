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
    friends: {},
}

const friendReducer = (state = initialState, action) => {
    let setState
    switch (action.type) {
        default:
            return state;
    }
}

export default friendReducer
