/* eslint-disable multiline-comment-style */
const express = require('express')
var bodyParser = require('body-parser')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const Keys = require('./keys')

const apiRoutes = require('./api/routes')

app
  .prepare()
  .then(() => {
    const server = express()

    // Allows for cross origin domain request:
    server.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    // MongoDB
    mongoose.Promise = Promise
    mongoose.connect(Keys.MONGODB_URI, { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))

    server.use(bodyParser.json())
    // API routes
    server.use('/api/v1', apiRoutes)

    // Static routes
    server.use('/uploads', express.static('uploads'))

    // Next.js routes
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      // eslint-disable-next-line
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
