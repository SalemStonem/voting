"use strict";
import cassandra from "./cassandra";
import config from "../config.json";
import messages from "./messages";
import validator from "validator";
import uuid from "node-uuid";
import async from "async";
import User from "./user"
import Student from "./student"
import Pro from "./pro"
import Admin from "./admin"



exports.post = (req, res) => {
  console.log('post');
  let user = new User(req.body, req.params)
  user.create((userdata, code) => {
    // const error = (code != 201) ? true : false
    const data = (!userdata) ? {} : userdata
    res.status(code).json({
      // code,
      data
    })
  })
}

exports.get = (req, res) => {
  console.log('get');
  const table = (validator.isEmail(req.params.userparam)) ? 'email' : 'id'
  if (table === 'email') req.params.email = req.params.userparam
  else req.params.userid = req.params.userparam
  if (req.params.userparam) {
    let user = new User(req.body, req.params)
    user.find(req.params.userparam, table)
      .then(userdata => {
        const error = (userdata && userdata._id) ? false : true
        const code = (error) ? 404 : 200
        const data = (error) ? {} : userdata
        res.status(code).json({
          // code,
          // message: messages.es[`"${code}"`],
          // error,
          data
        })
      })
      .catch(error => {
        console.log('Error: ', error);
        res.status(500).json({
          code: 500,
          message: messages.es["500"],
          error: true,
          data: {}
        })
      })
  } else res.status(500).json({
    code: 500,
    message: messages.es["500"],
    error: true,
    data: {}
  })

}
