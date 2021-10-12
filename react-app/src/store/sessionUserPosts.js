
// constants
const GET_SESSION_USER_POSTS = 'sessionUsersPosts/GET_SESSION_USER_POSTS'
const REMOVE_SESSION_USER_POSTS = 'sessionUsersPosts/REMOVE_SESSION_USER_POSTS'
const ADD_NEW_POST = 'sessionUsersPosts/ADD_NEW_POST'

const getSessionUsersPosts = (posts) => ({
    type: GET_SESSION_USER_POSTS,
    payload: posts
})

export const removeSessionUsersPosts = () => ({
    type: REMOVE_SESSION_USER_POSTS
})

const addNewPost = (post) => ({
    type: ADD_NEW_POST,
    payload: post
})

const initialState = { };

export const getSessionUsersPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const posts = await response.json();
        await dispatch(getSessionUsersPosts(posts))
        return null
    }
}

export const addNewPostThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: formData
    })
}

function sessionUserPostsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_SESSION_USER_POSTS:
            const posts = action.payload;
            const postsObj = {};
            posts.posts.forEach(post => postsObj[post.id] = post)
            newState = postsObj;
            return newState
        case REMOVE_SESSION_USER_POSTS:
            newState = {};
            return newState
        default:
            return state
    }
}



export default sessionUserPostsReducer
