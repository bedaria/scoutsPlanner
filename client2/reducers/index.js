import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'
import { newEvent } from './newEvent'
import { invites } from './invites'

export default combineReducers({
  friends,
  fakeLogin,
  newEvent,
  invites
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
// const inititalState = {
//   isFetching: false,
//   invites: [],
//   errorFetching: false,
//   redirect: false
// }
//
// topbarTabs: {
//    goTo: "/"
// }
