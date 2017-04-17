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
//   errorFetching: false
// }
//
// newEvent: {
//   isSubmitting: [],
//   updateAdminList: false,
//   errorCreating: false,
//   redirect: false
// }
//
// fakeLogin: {
//   isLoggingIn: false,
//   loginError: false
// }
//
// topbarTabs: {
//    goTo: "/"
// }
