const {Router} = require('express')
const { validarJWT } = require('../middlerwares/validateToken')
const {getMessage} = require('../controllers/message')

const router=Router()

router.get('/:to',validarJWT,getMessage)

module.exports=router