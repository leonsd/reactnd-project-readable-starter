import { combineReducers } from 'redux'
import post from './Post'
import comment from './Comment'

export default combineReducers({
  post,
  comment,
})
