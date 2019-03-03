const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/p/:id", (req, res) => {
      const actualPage = "/post";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.post("/upload", (req, res) => {
      const multer = require("multer");

      const handleError = (err, res) => {
        res
          .status(500)
          .contentType("text/plain")
          .end("Oops! Something went wrong!");
      };

      const upload = multer({
        dest: "/path/to/temporary/directory/to/store/uploaded/files"
        // you might also want to set some limits: https://github.com/expressjs/multer#limits
      });

      app.post(
        "/upload",
        upload.single(
          "file" /* name attribute of <file> element in your form */
        ),
        (req, res) => {
          const tempPath = req.file.path;
          const targetPath = path.join(__dirname, "./uploads/image.png");

          if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
              if (err) return handleError(err, res);

              res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
            });
          } else {
            fs.unlink(tempPath, err => {
              if (err) return handleError(err, res);

              res
                .status(403)
                .contentType("text/plain")
                .end("Only slideshow uploads are allowed");
            });
          }
        }
      );
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      // eslint-disable-next-line
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack);
    process.exit(1);
  });
