const {response} = require('express')
const { validationResult } = require('express-validator')
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs');
const { jsonWebToken } = require('../utils/jwt');
const dbConnection = require('../database/config');
const controller= ()=>{

    // async function createUser(req,res=>response){
    async function createUser(req,res){
    
        try {
            const {email,password} = req.body
            const existUser=await Usuario.findOne({email})
            if(existUser){
                res.status(400).json({
                    'message':'Se ha presentado un error'
                })  
                return
            }

            const user = new Usuario(req.body)
            // Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( password, salt );

            await user.save()
            console.log(user.uid)
            const token = await jsonWebToken(user.id)
            res.status(200).json({
                token,
                user
            })  
            return
            
 
        } catch (error) {
            console.error(error)
            res.status(500).json({
                'message':'Error creating user'
            })   
        }

    }
    
    async function login(req,res){

        const {email,password}= req.body
        const user = await Usuario.findOne({email})

        if(!user){
            res.status(404).json({
                'message':'Se ha presentado un error',
                'error':true
            })  
            return
        }

        const rightPassword=bcrypt.compareSync(password,user.password)
        if(!rightPassword){
            res.status(404).json({
                'message':'Se ha presentado un error',
                'error':true
            })  
            return
        }

        //Generate Token
        const token = await jsonWebToken(user.id)

        res.status(200).json({
            user,
            token,
            'error':false
        })
    }
    
    async function newToken(req,res){

        const uid = req.uid

        const newToken = await jsonWebToken(uid)
        const user= await Usuario.findById(uid)
        return res.status(200).json({
            user,
            newToken,
            'error':false
        })
    }

    return{
        login,
        newToken,
        createUser
    }
}

module.exports=controller()
