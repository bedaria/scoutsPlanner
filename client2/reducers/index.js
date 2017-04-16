import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'

export default combineReducers({
  friends,
  fakeLogin
})
