const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


//Database connection
const uri = `mongodb://localhost:27017/edge`
mongoose.connect(uri).then(()=>{
    console.log('Conectado!');
}).catch(e => console.log('error db: ',e));

//routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const welcomeRoutes = require('./routes/welcome');
const verifyToken = require('./middleware/verify_token');
//middlewares
app.use('/api/login', authRoutes);
app.use('/api/users', verifyToken, usersRoutes);
app.use('/api/welcome', verifyToken, welcomeRoutes);

app.get("/", (req, res)=>{
    res.json({
        state: true,
        messaje: 'works!'
    })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Running on port:${PORT}`);
})