const isAuthenticated =  function (req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = 1
  next()
}

const isAdmin = function(req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  next()
}

module.exports = {
  isAuthenticated: isAuthenticated,
  isAdmin: isAdmin
}
