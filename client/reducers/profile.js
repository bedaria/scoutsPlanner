const initialState = {
  username: '',
  email: '',
  phoneNumber: '',
  profilePicturePath: '',
  isFetching: false,
  errorFetching: false
}

export const profile = (state = initialState, action) => {
    switch(action.type) {
      case 'GET_PROFILE':
        return {...state, ...action.payload }
      case 'RECEIVE_PROFILE':
        return {...state, ...action.payload }
      default:
        return state
    }
}
