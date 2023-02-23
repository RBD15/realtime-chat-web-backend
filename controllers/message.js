const Message = require('../models/message')

const getMessage=async(req,res)=>{

    const uid=req.uid
    const {to} = req.params
    const messages = await Message.find({
        $or:[
            {user_to:to,user_from:uid},
            {user_from:uid,user_to:to}
        ]
    }).sort({cretedAt:'desc'}).limit(30)
    console.log(messages)

    return res.status(200).json({
        messages
    })
}

module.exports={
    getMessage
}