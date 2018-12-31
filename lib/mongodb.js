'use strict'

import mongoose from "mongoose"

import config from "../config.json"

class Mongoose {
  constructor() {
    mongoose.connect(`mongodb://127.0.0.1/UnPro`);
  }
}

export Mongoose
