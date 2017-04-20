const initialState = {
  redirectToPath: '',
  redirectError: '',
  selectedInSidebar: 'invites',
  selectedInTopbar: 'profile',
  currentPath: ''
}

//Buttons id's must be named the same as it's path part
export const tabs = (state = initialState, action) => {
  switch(action.type) {
    case 'REDIRECT_TO':
      return { ...state, ...action.payload }
    case 'ERROR_REDIRECTING':
      return { ...state, ...action.payload }
    case 'UPDATE_CURRENT_PATH':
      return { ...state, currentPath: action.currentPath }
    default:
      return state
  }
}
