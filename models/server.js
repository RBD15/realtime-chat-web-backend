const express = require('express')
const socket = require('socket.io')
const http = require('http')
const config = require('../config')
const Socket= require('./socket')
const cors = require('cors')
const dbConnection = require('../database/config')
const router = require('../router/auth')
const routerMessage = require('../router/message')

// He prefers used Path library when you have to move along folders
const path = require('path')
class Server{

    constructor(){
        this.app=new express(),
        this.server=http.createServer(this.app),
        this.io= socket(this.server)

        dbConnection()
    }
 
    middleware(){
        this.app.use(express.static(path.resolve(__dirname,'../public'))) 
        this.app.use(cors())
        this.app.use(express.json())

        this.app.use('/api/login',router)
        this.app.use('/api/message',routerMessage)
        
    }

    socketConfig(){
        new Socket(this.io)
    }

    init(){
        this.middleware()
        this.socketConfig()
        this.server.listen(config.server.port,()=>{
            console.log(`Server on ${config.server.port} port`)
        })
    }
}


module.exports=Server