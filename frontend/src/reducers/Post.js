import { ADD_POST, EDIT_POST, REMOVE_POST } from '../actions/Post'

const initialState = {
  posts: []
}

function post(state = initialState, action) {
  const { id, title, body, author, category } = action

  switch(action.type) {
    case ADD_POST:
      return {
        ...state.concat({
          [id]: id,
          [title]: title,
          [body]: body,
          [author]: category,
        })
      }
    case EDIT_POST:
      return {
        ...state.find(post => (
          post.id === id
          ? (post.title = title, post.body = body)
          : false
        ))
      }
    case REMOVE_POST:
      return {
        ...state.filter(post => post.id !== id)
      }
    default:
      return state
  }
}

export default post
