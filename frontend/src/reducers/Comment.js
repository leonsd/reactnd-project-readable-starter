import { ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT } from '../actions/Comment'

const initialState = {
  comments: []
}

function comment(state = initialState, action) {
  const { id, parentId, body, author } = action

  switch(action.type) {
    case ADD_COMMENT:
      return {
        ...state.concat({
          parentId: parentId,
          body: body,
          author: author,
        })
      }
    case EDIT_COMMENT:
      return {
        ...state.find(comment => (
          comment.id === id ? comment.body = body : false
        ))
      }
    case REMOVE_COMMENT:
      return {
        ...state.filter(comment => comment.id !== id)
      }
    default:
      return state
  }
}

export default comment
