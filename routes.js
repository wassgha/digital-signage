const routes = require('next-routes')

module.exports = routes()
  .add('/slideshow/:id', 'slideshow')
  .add('/display/:display', 'display')
