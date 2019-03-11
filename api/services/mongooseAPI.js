const devF = require("../../.dev.js")
const mongoose = require("mongoose")
const schemas = require("../models/simpleModel.js")

var db
class mongooseAPI {
  constructor() {
    mongoose.connect(devF.MONGO_URL)
    this.db = mongoose.connection
    // eslint-disable-next-line no-console
    this.db.on("error", console.error.bind(console, "connection error:"))
    
  }

  dropDatabase(){
    // eslint-disable-next-line no-console
    console.log("Lets see whats happening")
  }

  clearSchema(schemalModel){
    var testSchema = schemas.GROUP_MEMBER
    schemalModel.deleteMany({}, function(err){
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
    })
  }

  clearMirjans(){
    var testSchema = schemas.GROUP_MEMBER
    // eslint-disable-next-line no-console
    console.log("Frag noobs")
    testSchema.deleteMany({}, function(err){
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      // eslint-disable-next-line no-console
    })
  }

  getMirjans() {
    var data
    // eslint-disable-next-line no-console
    this.db.on("error", console.error.bind(console, "connection error:"))
    //this.db.on("open", function() {
      // we're connected!
      
      var testSchema = schemas.GROUP_MEMBER
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
        console.log(mirjans)
      })
      
      // eslint-disable-next-line no-console
      console.log(mirjan.name)
      // eslint-disable-next-line no-console
      console.log()
      // eslint-disable-next-line no-console
      console.log("yolo nerds")
      
    //})
    return data
  }
}

module.exports = mongooseAPI
