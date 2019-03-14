const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const dbAPI = require('./api/services/mongooseAPI')

const devF = require('./.dev.js')
const schemas = require("./api/models/sildeshowSchema")

app
  .prepare()
  .then(() => {
    const server = express()
    let db = new dbAPI()
    
    
    server.get('/mongoTest', (req, res) => {
      
      try{
        var slideShow = schemas.SLIDESHOW
        var slide = schemas.SLIDE
        
        var tSlide = new slide({
          URL: "https://i.imgur.com/3MlKktU.jpg",
          type: "photo",
          title: "Test Slide",
          descritpion: "A Slide for Testing Purposes",
          time: 5
        })

        var rSlide = new slide({
          URL: "https://i.imgur.com/3MlKktU.jpg",
          type: "photo",
          title: "2",
          descritpion: "A Slide for Testing Purposes",
          time: 5
        })

        var tSlideShow = new slideShow({
          title: "Test SlideShow",
          descritpion: "A slideshow for Testing Purposes",
          slides: []
        })
        // eslint-disable-next-line no-console
        console.log(tSlide.id)

        // eslint-disable-next-line multiline-comment-style
        //rSlide.save()
        tSlideShow.slides = [tSlide._id]
        tSlideShow.save(function(err) {
          // eslint-disable-next-line no-console
          if (err) return console.error(err)
          // eslint-disable-next-line no-console
          console.error(tSlideShow.slide)
          tSlide.save(function(err){
            // eslint-disable-next-line no-console
            if (err) return console.error(err)
            
            try{
              slideShow.find(function(err, data){
                // eslint-disable-next-line no-console
                if (err) return console.error(err)
                
                // eslint-disable-next-line no-console
                console.error(data)
                // eslint-disable-next-line no-console
                console.error(data[0].slides)
                 // eslint-disable-next-line no-console
                 console.error("Before populate")
              }).populate("slides").
              exec(function (err, data) {
                // eslint-disable-next-line no-console
                if (err) return console.error(err)
                 // eslint-disable-next-line no-console
                 console.error("After populate")
                // eslint-disable-next-line no-console
                console.error(data[0].slides)
              })
            }catch(e){
              // eslint-disable-next-line no-console
              console.log(e)
            }
          })
        })
      }catch(e){
        // eslint-disable-next-line no-console
        console.log(e)
      }
      // eslint-disable-next-line no-console
      console.log("We logged")
      res.send("mongoTest")
    })

    server.get('/mongoClear', (req, res) =>{
      db.clearSlides()
      res.send("mongo Clear")
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

