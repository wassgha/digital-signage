const devF = require("../../.dev.js")
const mongoose = require("mongoose")
//const schemas = require("../models/simpleModel")


var db
class mongooseAPI {

  constructor() {
    mongoose.connect(devF.MONGO_URL)
    this.db = mongoose.connection
    // eslint-disable-next-line no-console
    this.db.on("error", console.error.bind(console, "connection error:"))
  }
}

module.exports = mongooseAPI
