const router = require('express').Router();
const User = require('../models/User');
//Pass encrypt
const bcrypt = require('bcrypt');
//validaciones
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required()
});

router.get('/', async(req, res)=>{
    try{
        const users = await User.find()
        res.json({
            error:null,
            data:users
        });
    }catch(error){
        res.status(400).json(error);
    }
});

router.put('/', async(req, res)=>{
    //Se verifica la contraseña
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json('El usuario que esta tratando de editar no se encuentra en la db');
    }else{
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword){
            return res.status(400).json('Contraseña invalida!');    
        }      
    }
    //validaciones
    const{error} = schemaRegister.validate(req.body)
    if(error){
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    try{
        const savedUser = await User.updateOne({'_id': user._id},{ $set:{name: req.body.name} })
        res.json({
            error:null,
            data:savedUser
        });
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete('/', async(req, res)=>{
    //Se verifica la contraseña
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json('El usuario que esta tratando de editar no se encuentra en la db');
    }else{
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword){
            return res.status(400).json('Contraseña invalida!');    
        }      
    }

    try{
        const deletedUser = await User.deleteOne({'_id': user._id})
        res.json({
            error:null,
            data:deletedUser
        });
    }catch(error){
        res.status(400).json(error);
    }
})

module.exports = router;