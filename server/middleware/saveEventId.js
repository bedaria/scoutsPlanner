const saveEventId = function(req, res, next) {
  req.event = {}
  req.event.id = req.params.event
  next()
}

module.exports = saveEventId
