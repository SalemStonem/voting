"use strict"

import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http"
import messages from "./lib/messages";
import apikey from "./middleware/publickey";
import io from "socket.io"

import Routes from "./lib/routes"

//let app = express();

class Server {
  constructor() {
    this.port   = process.env.PORT || 8000
    this.host   = `localhost`

    this.app    = express()
    this.server = http.Server(this.app)
    this.socket = io(this.server, {origins:`${this.host}`})

  }
  appConfig()  {
    this.app.use(cors())
      // .all('*', apikey)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({extended: true}))
    //  .use('/', routes);

    // if (this.app.get('env') !== 'test') {
    //   this.app.use(logger('dev'));
    // }


    // this.app.use(function (req, res) {
    //   res.status(404).json({
    //     code: 404,
    //     data: {error: true, message: messages.es.notfound}
    //   });
    // });
    //
    //
    // if (this.app.get('env') === 'development') {
    //   this.app.use((err, req, res) => {
    //     res.status(err.status || 500).json({
    //       code: 500,
    //       data: {error: true, message: err.message}
    //     });
    //   });
    // }
    //
    // this.app.use((err, req, res) => {
    //   res.status(err.status || 500).json({
    //     code: 500,
    //     data: {error: true, message: error.message}
    //   });
    // });
  }

  includeRoutes() {
    new Routes(this.app,this.socket).routesConfig()
  }
  appExecute()  {
    this.appConfig()
    this.includeRoutes()
    const onListening = ()  => console.log(`Conexión exitosa en el puerto: ${this.port}`);
    this.server.listen(this.port, onListening)
  }
}

const app = new Server()
app.appExecute()
