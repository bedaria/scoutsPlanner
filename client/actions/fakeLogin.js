import axios from 'axios'

const loggingIn = () => {
  return {
    type: 'LOGGING_IN',
    isLoggingIn: true,
    isLoggedIn: false,
    loginError: false
  }
}

const loggedIn = (status, token) => {
  const payload = status === "success" ?
    { isLoggingIn: false, isLoggedIn: true, loginError: false }:
    { isLoggingIn: false, loginError: true, isLoggedIn: false }

  return {
    type: 'LOGGED_IN',
    payload
  }
}

export const fakeLogin = () => {
  return (dispatch) => {
    dispatch(loggingIn())
    return axios.post('/login')
      .then(({data}) => {
        const { username, token } = data
        localStorage.setItem('username', username)
        localStorage.setItem('token', token)
        dispatch(loggedIn("success"))
      })
      .catch(error => dispatch(loggedIn("error", error)))
  }
}
