const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const dbAPI = require('./api/services/mongooseAPI')
const devF = require('./.dev.js')

app
  .prepare()
  .then(() => {
    const server = express()
    let db = new dbAPI()
    server.get('/mongoTest', (req, res) => {
      db.getMirjans()
      app.render(req, res, '/mongoTest')
    })

    server.get('/mongoClear', (req, res) =>{
      db.clearMirjans()
    })


    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

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

