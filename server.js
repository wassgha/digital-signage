/* eslint-disable multiline-comment-style */
import express from 'express'
import next from 'next'
import mongoose from 'mongoose'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import { Server as SocketIoServer } from 'socket.io'

import Keys from './keys.js'
import apiRoutes from './api/routes/index.js'
import User from './api/models/User.js'

const dev = Keys.ENVIRON !== 'PROD'
const app = next({ dev })
const handle = app.getRequestHandler()

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
    mongoose.connect(
      Keys.MONGODB_URI,
      { useNewUrlParser: true }
    )
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))

    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }))
    // Parse application/json
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    // Parse cookies
    server.use(cookieParser())
    // Sessions
    server.use(
      session({
        secret: Keys.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
      })
    )

    // Passport
    passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    server.use(passport.initialize())
    server.use(passport.session())

    let io
    server.use(function(req, res, next) {
      res.io = io
      next()
    })

    // API routes
    server.use('/api/v1', apiRoutes)

    // Static routes
    server.use('/uploads', express.static('uploads'))

    // Next.js routes
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const finalServer = server.listen(Keys.PORT, err => {
      if (err) throw err
      // eslint-disable-next-line
      console.log('> Ready on http://localhost:' + Keys.PORT)
    })

    // Socket.io
    io = new SocketIoServer(finalServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
