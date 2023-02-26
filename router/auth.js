const {Router} = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/auth')
const {loginValidation} = require('../middlerwares/fieldValidation')
const {validarJWT} = require('../middlerwares/validateToken')
const router=Router()

router.post('/new',[
    check('email','Email is a required field').isEmail(),
    check('name','Name is a required field').isString().not().isEmpty(),
    check('password','Password is a required field').not().isEmpty(),
    loginValidation
],(req,res)=>authController.createUser(req,res))


router.post('/',[
    check('email','Email is a required field').isEmail(),
    check('password','Password is a required field').not().isEmpty(),
    loginValidation
],(req,res)=>authController.login(req,res))

router.post('/new/token',validarJWT,(req,res)=>authController.newToken(req,res))

module.exports=router

