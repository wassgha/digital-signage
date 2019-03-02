const mongoose = require('mongoose')
const Schema = mongoose.Schema
const groupMember = new Schema({
    title: { type: String   },
    name: { type: String }
})

//module.exports = mongoose.model('member', groupMember)

module.exports = {
    GROUP_MEMBER: mongoose.model('member', groupMember)
}