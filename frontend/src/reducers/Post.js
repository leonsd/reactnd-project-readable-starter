import { ADD_POST, EDIT_POST, REMOVE_POST } from '../actions/Post'

const initialState = {
  posts: []
}

function post(state = initialState, action) {
  const { post, id, title, body } = action

  switch(action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          post,
        ]
      })
    case EDIT_POST:
      return (
        state.find(p => (
          p.id === id
          ? (p.title = title, p.body = body)
          : false
        ))
      )
    case REMOVE_POST:
      return (
        state.filter(post => post.id !== id)
      )
    default:
      return state
  }
}

export default post
