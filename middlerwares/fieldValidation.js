const {validationResult} = require('express-validator')

const loginValidation=(req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({
            'message':errors.mapped(),
            'error':true
        })
        return
    }

    next()
}

module.exports={loginValidation}