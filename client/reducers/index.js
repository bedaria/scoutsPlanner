import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'
import { newEvent } from './newEvent'
import { invites } from './invites'
import { tabs } from './tabs'
import { myEvents } from './myEvents'
import { profile } from './profile'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  friends,
  fakeLogin,
  newEvent,
  invites,
  tabs,
  myEvents,
  profile,
  form: formReducer
})
