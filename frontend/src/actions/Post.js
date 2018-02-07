export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost(post) {
  return({
    type: ADD_POST,
    post,
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
