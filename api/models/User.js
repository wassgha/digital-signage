import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema

const User = new Schema({})

User.plugin(passportLocalMongoose)

export default mongoose.model('User', User)
