const jwt = require('jsonwebtoken')

const validarJWT=(req,res,next)=>{
    try {
        const token = req.header('Authorization')

        if(!token){
            return res.status(401).json({
                'message':'Error con el token',
                'error':true
            })  
        }

        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.uid = payload
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            'message':'Error con el token',
            'error':true
        })  
    }
}

module.exports={validarJWT}