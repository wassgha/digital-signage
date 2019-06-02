const routes = require('next-routes')

module.exports = routes()
  .add('/slideshow/:id', 'slideshow')
  .add('/display/:id', 'display')
  .add('/layout/:id', 'layout')
