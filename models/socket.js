const { onlineLoggedStatus, offlineLoggedStatus, getUsers, newMessage,getChatMessages} = require('../controllers/socket')
const {comprobarJsonWebToken} = require('../utils/jwt') 

class Socket{
    constructor(io){
        this.io=io,
        this.socketEvents()
    }

    socketEvents(){
        this.io.on('connection',async (client)=>{
            console.log(client.id)
            console.log('listening')

            const uid = comprobarJsonWebToken(client.handshake.query['Authorization'])
            client.join(uid);
            
            if(client.handshake.query['Authorization']){
                console.log('Conectado')
                await onlineLoggedStatus(uid)
                this.io.emit('get-users',await getUsers())
            }

            this.io.emit('get-users',await getUsers())

            client.on('get-messages',async(payload)=>{
                const messages = await getChatMessages(uid,payload)
                this.io.to(uid).emit('chat-messages',messages)
            })

            client.on('new-message',async(payload)=>{
                await newMessage(payload)
                this.io.to(payload.user_to).emit('personal-message',payload)
            })

            client.on('disconnect',async()=>{
                await offlineLoggedStatus(uid)
                this.io.emit('get-users',await getUsers())
                console.log("desconectado")
            })
        })
    }

}

module.exports=Socket