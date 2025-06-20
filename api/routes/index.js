import express from 'express'
import slideRoutes from './slide.js'
import slideshowRoutes from './slideshow.js'
import displayRoutes from './display.js'
import userRoutes from './user.js'
import widgetsRoutes from './widgets.js'

const router = express.Router()

router.use('/slide', slideRoutes)
router.use('/slideshow', slideshowRoutes)
router.use('/display', displayRoutes)
router.use('/user', userRoutes)
router.use('/widgets', widgetsRoutes)

export default router
