const users = {
  'Frankie': 1,
  'Copper': 2,
  'Aidan': 3
}

const isAuthenticated =  function (req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = users[req.user.name]
  next()
}

const isAdmin = function(req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = users[req.user.name]
  next()
}

module.exports = {
  isAuthenticated: isAuthenticated,
  isAdmin: isAdmin
}
