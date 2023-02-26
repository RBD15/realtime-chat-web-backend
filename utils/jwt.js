const jwt = require('jsonwebtoken')

const jsonWebToken=(uid)=>{
    return new Promise((resolve,reject)=>{
        const payload = uid
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            resolve(token)
            
        })
    })
}

const comprobarJsonWebToken=(token)=>{

    try {
        const uid = jwt.verify(token,process.env.JWT_SECRET)
        return uid
    } catch (error) {
        console.log('Error con jwt',error)
    }

}

module.exports={
    jsonWebToken,
    comprobarJsonWebToken
}