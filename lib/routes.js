'use strict'

import validator  from "validator"
import lib from "./lib"

class Routes {
  constructor(app,socket) {
    this.app  = app;
    this.socket = socket
  }
  async appRoutes() {
    this.app.get(`/v1/votacion/:userparam`,lib.get)
    this.app.post(`/v1/votacion/`,lib.post)
  }
  routesConfig()  {
    this.appRoutes()
  }
}

  module.exports = Routes
