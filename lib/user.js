'use strict'

const UserModel = require('./models').User
const AddressModel = require('./models').Address

class User  {
  constructor(body,params,query,method) {
    this.userdata = (body)
                    ? body
                    : null
    this.userid   = (params && params.userid)
                    ? params.userid
                    : null
    this.method   = (method)
                    ? method
                    : null
  }

  create(callback)  {
    let user  = new UserModel(this.userdata)
    this.find(this.userdata.email, 'email')
      .then(findeduser  =>  {
        if(!findeduser)  {
          user.save()
            .then(userdata  =>  {
              if(userdata && userdata._id)  callback(userdata,201)
              else callback(false,503)
            })
            .catch(error  =>  {
              console.log('Error: ', error);
              callback(false,400)
            })
        } else return callback(false,501)
      })
      .catch(error  =>  {
        console.log('Error: ', error);
        callback(false,400)
      })
  }

  find(data, table)  {
    let find = (table == 'id')
               ? {_id:data}
               : {email:data}
    return UserModel.findOne(find)
      .then(userdata  =>  {
        if(userdata && userdata._id)  return userdata
        else return false
      })
      .catch(error  =>  {
        console.log('Error: ', error);
        return false
      })
  }

  auth(data)  {
    console.log('data: ', data);
    return UserModel.findOne(data)
      .then(userdata  =>  {
        if(userdata && userdata._id)  return userdata
        else return false
      })
      .catch(error  =>  {
        console.log('Error: ', error);
        return false
      })
  }

  show()  {

  }

  validatePassword()  {
    if(this.userdata.password === this.userdata.repassword) return true
    else return false
  }

  activateAcount()  {
    UserModel.fin
  }

  update(callback)  {
    const id = (this.userdata._id) ? this.userdata._id : this.userid
    UserModel.findOneAndUpdate({_id: id},{$set:this.userdata})
      .then(async (updateduser) =>  {
        console.log('update', updateduser);
        if(updateduser && updateduser._id)  {
          console.log(1);
          if(updateduser.address && updateduser.address._id)  {
            AddressModel.findOneAndUpdate({user:this.userdata._id},{$set:this.userdata.address})
              .then(updatedaddress =>  {
                console.log(2);
                if(updatedaddress && updatedaddress._id)  {
                } else callback(false,404)
              })
              .catch(error => {
                console.log('Error: ', error);
                callback(false,501)
              })
          }
          this.find(updateduser._id, 'id')
            .then(userdata  =>  {
              if(userdata && userdata._id)  callback(userdata,201)
              else callback(false,404)
            })
            .catch(error => {
              console.log('Error: ', error);
              callback(false,501)
            })



        } else { console.log("No encontrado") }
      })
      .catch(error  =>  {
        console.log('Error: ', error);
        return false
      })
  }

  delete()  {

  }

  harddelete()  {

  }
}

module.exports = User
