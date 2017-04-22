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

const birthdayDates = birthdays.map(date => new Date(date))
const fakeUserEmails = fakeUsers.map(user =>  user + "@" + "someplace.com")
const fakePhoneNumber = "(111) 111-1111"
const fakeProfilePicPaths = fakeUsers.map((user, idx) => {
  const path = user.split(' ').join('')
  return profilePics.has(path) ? path : null
})
var startTime = new Date()
var endTime = new Date()
startTime.setHours(20)
startTime.setMinutes(30)
startTime.setSeconds(0)
endTime.setHours(23)
endTime.setMinutes(0)
endTime.setSeconds(0)

fakeUsers.forEach((fakeUser, idx) => setTimeout(() => {
  console.log("creating: ", fakeUser, fakeUserEmails[idx], fakeProfilePicPaths[idx])
  DB.User.create({
    name: fakeUser,
    email: fakeUserEmails[idx],
    profilePicturePath: fakeProfilePicPaths[idx],
    phoneNumber: '1234567',
    phoneAreaCode: '111'
  })
  .then(user => {
    DB.Event.create({
      name: "A birthday event.",
      startTime: startTime,
      endTime: endTime,
      startDate: birthdayDates[idx],
      endDate: birthdayDates[idx],
      message: "MY BIRTHDAAAYY",
      address: "TBD"
    })
    .then(event => {
      return event.setMainAdmin(user)
    })
    .then(() => {
      console.log(fakeUser, " created event")
    })
    .catch(error => {
      console.log("error: ", error)
    })

  })
  .catch(error => {
    console.log("error: ", error)
  })
}, 1000*idx))
