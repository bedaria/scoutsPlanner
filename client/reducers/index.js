import { combineReducers } from 'redux'
import { fakeLogin } from './fakeLogin'
import { friends } from './friends'
import { newEvent } from './newEvent'
import { tabs } from './tabs'
import { events } from './events'
import { profile } from './profile'
import { reply } from './reply'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  friends,
  fakeLogin,
  newEvent,
  tabs,
  events,
  profile,
  reply,
  form: formReducer
})
