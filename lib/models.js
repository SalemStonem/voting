'use strict'

import mongoose from "mongoose"

const Schema = mongoose.Schema

mongoose.connect(`mongodb://127.0.0.1/miio`)
mongoose.Promise = Promise;



var user = new Schema({
  email: {type: String},
  name: {type: String},
  fundation: {type: String},
  designid: {type: Number},
}, {collection: "User"})

var UserModel = mongoose.model("User",user)
module.exports.User = UserModel
