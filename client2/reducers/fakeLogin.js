const initialState = {
  isLoggingIn: false,
  loginError: false
}

export const fakeLogin = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGGING_IN':
      return {...state, isLoggingIn: action.isLoggingIn}
    case 'LOGGED_IN':
      return {...state, ...action.payload}
    default:
      return state
  }
}
