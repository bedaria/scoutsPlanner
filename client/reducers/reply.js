const initialState = {
  isSubmitting: false,
  errorSubmitting: false,
  successSubmitting: false
}

export const reply = (state = initialState, action) => {
  switch(action.type) {
    case 'SUBMIT_REPLY':
      return { ...state, ...action.payload}
    case 'DONE_SUBMITTING':
      return { ...state, ...action.payload}
    default:
      return state
  }
}
