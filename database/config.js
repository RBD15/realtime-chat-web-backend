const moongose = require('mongoose')

const dbConnection=async()=>{
    try {
        await moongose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true            
        }) 
        console.log('DB Mongo OK')
    } catch (error) {
        console.log(error)
    }

}

module.exports= dbConnection