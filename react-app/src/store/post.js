const LOAD = "posts/LOAD"

const load = (posts) => ({
    type: LOAD,
    posts,
})

export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts`)
    if (response.ok) {
        const posts = await response.json();
        dispatch(load(posts))
        return posts
    }
}

const initialState = {
    posts: {},
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            let allPosts = {};
            action.posts.posts.forEach((post) => {
                allPosts[post.id] = post
            })
            return { ...state, posts: allPosts }
        default:
            return state;
    }
}

export default postReducer
