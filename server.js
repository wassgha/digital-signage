const express = require("express")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()
var pathForUploadedFiles = []

app
  .prepare()
  .then(() => {
    const server = express()

    server.get("/p/:id", (req, res) => {
      const actualPage = "/post"
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.post("/api/slide/upload", (req, res) => {
      //handy npm package that parses form data
      const formidable = require("formidable")
      var form = new formidable.IncomingForm()
      form.uploadDir = "./Uploaded_Slides"
      form.keepExtensions = true
      form.multiples = false
      //parse the sent data and save it, as well as save the path for alex to work his database magic
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.json({
            result: "Failed!",
            message: "Cannot upload file, Error: ${err}"
          })
        }
        const filePath = files.data.path
        pathForUploadedFiles.push(filePath)
      })
    })

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      // eslint-disable-next-line
      console.log("> Ready on http://localhost:" + port)
    })
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
