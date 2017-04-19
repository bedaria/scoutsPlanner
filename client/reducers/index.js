import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'
import { newEvent } from './newEvent'
import { invites } from './invites'
import { tabs } from './tabs'
import { myEvents } from './myEvents'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  friends,
  fakeLogin,
  newEvent,
  invites,
  tabs,
  myEvents,
  form: formReducer
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
//   loginError: false,
//   loggedIn: false
// }
//
// invites = {
//   isFetching: false,
//   invites: [],
//   errorFetching: false,
//   inviteButtons: []
// }
//
// tabs = {
//   onInvites: true
// }
//
//  myEvents = {
//   isFetching: false,
//   myEvents: [],
//   errorFetching: false
// }
