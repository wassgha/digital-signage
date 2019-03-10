const devF = require("../../.dev.js")
const mongoose = require("mongoose")

var db
class mongooseAPI {
  constructor() {
    mongoose.connect(devF.MONGO_URL)
    this.db = mongoose.connection
    // eslint-disable-next-line no-console
    this.db.on("error", console.error.bind(console, "connection error:"))
  }

  clearDatabase(schemaName){
      db.dropDatabase()
  }

  clearMirjans(){
    var testSchema = schemass.GROUP_MEMBER
    
  }

  getMirjans() {
    var data
    // eslint-disable-next-line no-console
    this.db.on("error", console.error.bind(console, "connection error:"))

    this.db.once("open", function() {
      // we're connected!

      const schemass = require("../models/simpleModel.js")
      var testSchema = schemass.GROUP_MEMBER
      var mirjan = new testSchema({
        name: "Mirjan",
        title: "Doritoes and MTn Dew Code Red Fetcher"
      })
      mirjan.save(function(err, mirjan) {
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
      })

      testSchema.find(function(err, mirjans) {
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
        data = mirjans
      })
      // eslint-disable-next-line no-console
      console.log(mirjan.name)
      // eslint-disable-next-line no-console
      console.log(data)
      // eslint-disable-next-line no-console
      console.log("yolo nerds")
    })
    return data
  }
}

module.exports = mongooseAPI
