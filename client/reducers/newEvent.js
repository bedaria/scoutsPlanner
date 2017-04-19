const initialState = {
  isSubmitting: false,
  updateAdminList: false,
  errorCreating: false,
  redirect: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_NEW_EVENT':
      return { ...state, isSubmitting: true }
    case 'NEW_EVENT_CREATED':
      return { ...state, isSubmitting: false, ...action.payload }
    case 'RESET_REDIRECT':
      return { ...state, redirect: false}
    default:
      return state
  }
}
