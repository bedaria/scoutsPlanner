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
                "Lucia",
                "Alexis Bledel",
                "Lauren Graham",
                "Melissa McCarthy",
                "Keiko Agena",
                "Sandra Oh",
                "Kevin McKidd",
                "Jessee Williams",
                "Jerrika Hinton"]

const fakeUserEmails = fakeUsers.map(user =>  user + "@" + "someplace.com")
const fakePhoneNumber = "(111) 111-1111"
const fakeProfilePicPaths = fakeUsers.map((user, idx) => {
  const path = user.split(' ').join('')
  return profilePics.has(path) ? path : null
})

fakeUsers.forEach((fakeUser, idx) => setTimeout(() => {
  console.log("creating: ", fakeUser,fakeUserEmails[idx],fakeProfilePicPaths[idx])
  DB.User.create({
    name: fakeUser,
    email: fakeUserEmails[idx],
    profilePicturePath: fakeProfilePicPaths[idx],
    phoneNumber: '1234567',
    phoneAreaCode: '111'
  })
}, 1000*idx))
