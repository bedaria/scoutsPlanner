import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'
import { newEvent } from './newEvent'

export default combineReducers({
  friends,
  fakeLogin,
  newEvent
})

//initial states:
//friends:  {
//   friends: [],
//   isFetching: false,
//   errorFetching: false,
//   redirecToNewEvent: false,
// }
// 
// newEvent: {
//   isSubmitting: [],
//   updateAdminList: false,
//   redirectToProfile: true,
//   errorCreating: false
// }
//
// fakeLogin: {
//   isLoggingIn: false,
//   loginError: false
// }
