const user = require('./models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;

const users = [{
    name: 'Pedro',
    email: 'pedro@email.com',
    password: '123'
},{
    name: 'Maria',
    email: 'maria@email.com',
    password: '456'
},{
    name: 'Marcos',
    email: 'marcos@email.com',
    password: '789'
},{
    name: 'Liz',
    email: 'liz@email.com',
    password: '321'
},{
    name: 'Luis',
    email: 'luis@email.com',
    password: '654'
}]

const usersWithHashedPasswordsPromiseArray = users.map(
    async (u) => {
      let hashedPassword = await bcrypt.hash(u.password, saltRounds);
      u.password = hashedPassword;
      return u;
  })
;

const uri = `mongodb://localhost:27017/edge`
mongoose.connect(uri).then(()=>{
    Promise.all(usersWithHashedPasswordsPromiseArray)
        .then((data)=>{
            user.insertMany(data).then((docs) => {
                console.log(`success, ${docs.length} registros insertados`)
            }).catch((err) => {
                console.log(`Error: ${err}`)
            })
        }).catch((err)=> console.log(`Error al insertar: ${err}`))
     
}).catch(e => console.log('error db: ',e));