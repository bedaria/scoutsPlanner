export const darkenTab = (tabId) => {
  const onInvites = tabId === "invitesTab"

  return {
    type: 'CHANGE_TAB',
    onInvites
  }
}
