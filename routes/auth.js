const router = require('express').Router();
const User = require('../models/User');
//Pass encrypt
const bcrypt = require('bcrypt');
//validaciones
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required()
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required()
});

router.post('/register', async(req, res)=>{
    //validaciones
    const{error} = schemaRegister.validate(req.body)
    if(error){
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    //email unico
    const existEmail = await User.findOne({ email: req.body.email });
    if(existEmail){
        return res.status(400).json(
            {error: 'La direccion de email ya se encuentra registrada.'}
        )
    }
    // cifrar pass
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try{
        const savedUser = await user.save();
        res.json({
            error:null,
            data:savedUser
        });
    }catch(error){
        res.status(400).json(error);
    }
});

router.post('/', async(req, res)=>{
    const { error } = schemaLogin.validate(req.body);
    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json('Usuario o contraseña invalidos');
    }else{
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword){
            return res.status(400).json('Usuario o contraseña invalidos');    
        }      
    }
    
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error:null,
        data:{token}
    });
});

module.exports = router;