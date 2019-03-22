const express = require("express")
const next = require("next")
const formidable = require("formidable")

const dev = process.env.NODE_ENV !== "production"
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

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
      var form = new formidable.IncomingForm()
      form.uploadDir = "./uploads"
      form.keepExtensions = true
      form.multiples = false
      //parse the sent data and save it + the path for alex
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.json({
            result: "error",
            message: "Cannot upload file, Error: ${err}"
          })
        }
        const filePath = files.data.path
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
