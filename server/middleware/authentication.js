const isAuthenticated =  function (req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = 3
  next()
}

const isAdmin = function(req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = 3
  next()
}

module.exports = {
  isAuthenticated: isAuthenticated,
  isAdmin: isAdmin
}
