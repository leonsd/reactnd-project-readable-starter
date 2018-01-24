export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addComment({ parentId, body, author }) {
  return({
    type: ADD_COMMENT,
    parentId,
    body,
    author,
  })
}

export function editComment({ id, body, author }) {
  return({
    type: EDIT_COMMENT,
    id,
    body,
  })  
}

export function removeComment({ id }) {
  return({
    type: REMOVE_COMMENT,
    id,
  })  
}
