'use strict'

const UserModel = require('./models').User

class User {
  constructor(body,params) {
    this.userdata = (body) ? body : null
    this.userid = (params && params.userid) ? params.userid : null
  }

create(callback) {
  let user = new UserModel(this.userdata)
  user.save()
    .then(userdata => {
      if(userdata && userdata._id) callback(userdata,201)
      else callback(false,503)
    })
    .catch(error => callback(false,400))
}

find(data, table) {
  let find = (table == 'id') ? {_id:data} : {email:data}
  return UserModel.findOne(find)
  .then(userdata => {
    if(userdata && userdata._id) return userdata
    else return false
  })
  .catch(error => return false)
}

}
module.export = User
