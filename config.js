require('dotenv').config();
const config={
    server:{
        port: process.env.PORT || 8080,
        host:'localhost',
    }
}

module.exports=config