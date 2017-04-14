import axios from 'axios'
// 
// const createEvent = () => {
//
// }
//
// const createEventAndInvite = () => {
//   return (dispatch) => {
//     dispatch()
//   }
// }
//
// const receiveFriends = (status, friends) => {
//   const payload = status === "success" ?
//       {isFetchingFriends: false, friends} :
//       {isFetchingFriends: false, error: "Couldnt' fetch friends :("}
//
//   return {
//     type: 'RECEIVE_FRIENDS',
//     payload
//   }
// }
//
// export const fetchFriends = () => {
//   return (dispatch) => {
//     dispatch(requestFriends())
//     return axios.get('/users/admin')
//       .then(({data}) => {
//         dispatch(receiveFriends("success", data.users))
//       })
//       .catch(error => {
//         dispatch(receiveFriends("error", error))
//       })
//   }
// }

// const initialState ?? form data?
// export const events = (state = {}, action) => {
//   switch(action.type) {
//     case 'CREATE_EVENT':
//   }
// }
