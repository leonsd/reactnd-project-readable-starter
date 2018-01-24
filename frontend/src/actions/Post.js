export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost({ title, body, author, category }) {
  return({
    type: ADD_POST,
    title,
    body,
    author,
    category,
  })
}

export function editPost({ id, title, body }) {
  return({
    type: EDIT_POST,
    id,
    title,
    body,
  })
}

export function removePost({ id }) {
  return({
    type: REMOVE_POST,
    id,
  })
}
