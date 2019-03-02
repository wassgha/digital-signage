const express = require('express')
const next = require('next')
const formidable = require('formidable')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const apis = require('./api/services/mongooseAPI')
const devF = require('./.dev.js')

app
  .prepare()
  .then(() => {
    const server = express()
    let db = new apis()
    db.getMirjans()
    server.get('/mongoTest', (req, res) => {
      
      app.render(req, res, '/mongoTest', data)
    })


    mongoose.connect(devF.MONGO_URL)
    var db = mongoose.connection
    // eslint-disable-next-line no-console
    db.on('error', console.error.bind(console, 'connection error:'))
    var data
    db.once('open', function() {
      // we're connected!
      const schemass = require('./api/models/simpleModel.js')
      var testSchema = schemass.GROUP_MEMBER
      var mirjan = new testSchema({name: 'Mirjan', title: 'Doritoes and MTn Dew Code Red Fetcher'})
      mirjan.save(function (err, mirjan){
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
      })

      testSchema.find(function (err, mirjans){
        // eslint-disable-next-line no-console
        if(err) return console.error(err)
        // eslint-disable-next-line no-console
        data = mirjans
      })
      // eslint-disable-next-line no-console
      console.log(mirjan.name)
      // eslint-disable-next-line no-console
      console.log('yolo nerds')
    })

    
    server.get('/mongoTest', (req, res) => {
      
      app.render(req, res, '/mongoTest', data)
    })


    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.post('/api/slide/upload', (req, res) => {
      var form = new formidable.IncomingForm()
      form.uploadDir = './uploads'
      form.keepExtensions = true
      form.multiples = false
      //parse the sent data and save it + the path for alex
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.json({
            result: 'error',
            message: 'Cannot upload file, Error: ${err}'
          })
        }
        const filePath = files.data.path
      })
    })

    server.use('/uploads', express.static('uploads'))

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

