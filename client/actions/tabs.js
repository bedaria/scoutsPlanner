export const updateCurrentPath = (currentPath) => {
  return {
    type: 'UPDATE_CURRENT_PATH',
    currentPath
  }
}

export const redirectTo = (tabId, currentPath) => {
  //ie: currentPathArray = ['', 'profile', 'invites']
  var currentPathArray = currentPath.split('/')

  if(tabId === "invites" || tabId === "myEvents") {
    currentPathArray[2] = tabId
    return {
      type: 'REDIRECT_TO',
      payload: {
        redirectToPath: currentPathArray.join("/"),
        selectedInSidebar: tabId,
        currentPath
      }
    }
  }
  else if(tabId === "profile" || tabId === "newEvent") {
    currentPathArray[1] = tabId
    return {
      type: 'REDIRECT_TO',
      payload: {
        redirectToPath: currentPathArray.join("/"),
        selectedInTopbar: tabId,
        currentPath
      }
    }
  }
  else
    return {
      type: 'ERROR_REDIRECTING',
      redirectError: 'Invalid path'
    }

}
