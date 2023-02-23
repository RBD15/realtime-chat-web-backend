const users = require('../models/user')
const messages = require('../models/message');

const offlineLoggedStatus = async(uid)=>{
    const user = await users.findById(uid)
    user.online=false;
    await user.save()
}

const onlineLoggedStatus = async(uid)=>{
    const user = await users.findById(uid)
    user.online=true;
    await user.save()
}

const newMessage=async(message)=>{
    const newMessage=new messages(message);
    return await newMessage.save()
}

const getUsers = async()=>{

    const allUsers = await users.find().sort('-online')
    return allUsers
}

const getChatMessages = async(uid,fromUid)=>{
    console.log('chat data searching',{uid,fromUid})
    const allChatMessages = await messages.find({
        $or:[
            {user_to:uid,user_from:fromUid},
            {user_from:uid,user_to:fromUid}
        ]
    })
    console.log('Mensajes del chat',allChatMessages)
    return allChatMessages
}


module.exports={offlineLoggedStatus,onlineLoggedStatus,getUsers,newMessage,getChatMessages}
