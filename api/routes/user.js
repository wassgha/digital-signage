import express from 'express'
import passport from 'passport'
import User from '../models/User.js'

const router = express.Router()

router.get('/demo', function(req, res) {
  User.register(new User({ username: 'demo' }), 'demo', function() {
    res.redirect('/')
  })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({ success: true })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

export default router
