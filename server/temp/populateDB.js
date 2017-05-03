const DB = require('../models/index.js')
const profilePics = require('../profile_pictures/index.js')
const fakeUsers = ["Copper",
                "Frankie",
                "Aidan",
                "Ellen Degeneres",
                "Beyonce",
                "Mila Kunis",
                "Emma Watson",
                "Jeremy White",
                "Daniel Kaluuya",
                "Tom Hardy",
                "Helen McCrory",
                "Cillian Murphy",
                "Joe Cole",
                "Matt Damon",
                "Jonah Hill",
                "Channing Tatum",
                "Emma Stone",
                "Emma Roberts",
                "Jimmy Fallon",
                "Jimmy Kimmel",
                "John Oliver",
                "John Cho",
                "Tina Fey",
                "Samantha Bee",
                "Michael Che",
                "Hannah Simone",
                "Zooey Deschanel",
                "Kate McKinnon",
                "Alexis Bledel",
                "Lauren Graham",
                "Melissa McCarthy",
                "Keiko Agena",
                "Sandra Oh",
                "Kevin McKidd",
                "Jessee Williams",
                "Jerrika Hinton"]
const birthdays = ["October 10 2017",
                   "December 12 2017",
                   "September 9 2017",
                   "January 26 2018",
                   "September 4 2017",
                   "August 14 2017",
                   "April 15 2017",
                   "February 17 2018",
                   "May 8 2017",
                   "September 15 2017",
                   "August 17 2017",
                   "May 25 2017",
                   "November 28 2017",
                   "October 8 2017",
                   "December 20 2017",
                   "April 26 2017",
                   "November 6 2017",
                   "February 10 2018",
                   "September 19 2017",
                   "November 13 2017",
                   "April 23 2017",
                   "June 16 2017",
                   "May 18 2017",
                   "October 25 2017",
                   "May 19 2017",
                   "August 3 2017",
                   "January 17 2018",
                   "January 6 2018",
                   "September 16 2017",
                   "March 16 2018",
                   "August 26 2017",
                   "October 3 2017",
                   "July 20 2017",
                   "August 9 2017",
                   "August 5 2017",
                   "September 21 2017"]
const fakeUserEmails = fakeUsers.map(user =>  user + "@" + "someplace.com")
const fakePhoneNumber = "(111) 111-1111"
const fakeProfilePicPaths = fakeUsers.map((user, idx) => {
  const path = user.split(' ').join('')
  return profilePics.has(path) ? path : null
})

const tasks = []
for(var i = 0; i < fakeUsers.length; i++)
  tasks[i] = {'name': 'a task ' + i, 'volunteersNeeded': 20 }

var invites = []
for(var i = 0; i < fakeUsers.length; i++)
  invites[i] = i

const createUsers = fakeUsers.map((fakeUser, idx) => {
  return () =>  (
      DB.User.create({
        name: fakeUser,
        email: fakeUserEmails[idx],
        profilePicturePath: fakeProfilePicPaths[idx],
        phoneNumber: '1234567',
        phoneAreaCode: '111'
      })
    )
  })

const createEvents = birthdays.map((date,idx) => {
  const startDateTime = new Date(date)
  const endDateTime = new Date(date)
  startDateTime.setHours(5)
  startDateTime.setMinutes(30)
  startDateTime.setSeconds(0)
  endDateTime.setHours(10)
  endDateTime.setMinutes(30)
  endDateTime.setSeconds(0)

  return () => (
      DB.Event.create({
        name: "Something",
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        message: "Need help with stuff!",
        address: "TBD"
      })
  )
})

Promise.all(createUsers.map(createUser => createUser()))
  .then(done => console.log("done"))
// const createUsersAndEvents = createUsers.concat(createEvents)
// var volunteers = []
// var eventList = []
// Promise.all(createUsersAndEvents.map(fn => fn()))
//   .then(results => {
//     console.log("done creating", results.length/2, "events and users.")
//     var users = results.splice(0, results.length/2)
//     var events = results
//     volunteers = users
//     eventList = events
//     const addAdmins = events.map((event, idx) => {
//       return () => (event.setMainAdmin(users[idx]))
//     })
//
//     return Promise.all(addAdmins.map(fn => fn()))
//   })
//   .then(events => {
//     console.log("done setting main admins for", events.length, "events.")
//     const addVolunteers = events.map((event, idx) => {
//       return () => (event.addVolunteer(volunteers))
//     })
//
//     return Promise.all(addVolunteers.map(fn => fn()))
//   })
//   .then((invitedUsers) => {
//     console.log("done adding volunteers to", invitedUsers.length, "events")
//     return Promise.all(tasks.map(task => DB.Task.create(task)))
//   })
//   .then(tasks => {
//     console.log("created", tasks.length, "tasks.")
//     return Promise.all(eventList.map((event, idx) =>(event.setTasks([tasks[idx]]))))
//   })
//   .then(eventTasks => {
//     console.log("created tasks for", eventTasks.length, "events.")
//   })
//   .catch(error => {
//     console.log("error with populating database: ", error)
//   })
