//Updates seen attribute to true in an eventVolunteer instance
//INPUT: <models.EventVolunteer> eventVolunteer
//OUTPUT:
const updateEventVolunteer = function(eventVolunteer, attribute, value) {
  const update = {}
  update[attribute] = value

  eventVolunteer.update(update)
    .then(updated => {
        console.log(__filename, ":")
        console.log("models.EventVolunteer.,", attribute, " successfully updated to ", value)
    })
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
    })
}

module.exports = {
  updateEventVolunteer: updateEventVolunteer
}
