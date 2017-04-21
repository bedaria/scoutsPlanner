const DB = require('../models/index.js')
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
                "Kate McKinnon",
                "Tina Fey",
                "Samantha Bee",
                "Michael Che",
                "Hannah Simone",
                "Zooey Deschanel",
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
//profile_pictures + / + user.removeWhiteSpaces
fakeUsers.forEach((fakeUser, idx) => setTimeout(() => {
  console.log("creating: ", fakeUser)
  DB.User.create({name: fakeUser})
}, 1000*idx))