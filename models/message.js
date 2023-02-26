const {moongose, Schema, model}=require('mongoose')

const messageSchema= Schema({

    content:{
        type:String,
        required:true
    },
    user_to:{
        type:Schema.ObjectId,
        ref:'userChat',
        required:true,
    },
    user_from:{
        type:Schema.ObjectId,
        ref:'userChat',
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }

},{
    timestamps:true
})

messageSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports= model('messageChat',messageSchema)