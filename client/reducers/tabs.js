const initialState = {
  onInvites: true
}

export const tabs = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_TAB':
      return { ...state, onInvites: action.onInvites}
    default:
      return state
  }
}
