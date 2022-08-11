const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const verifyJWT = require('./middlewares/jwt')
dotenv.config()

app.use(express.json())

app.post('/login', (req, res) => {
    if(req.body.user === "Eduardo" && req.body.password === '123'){
        const id = 1;
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 300
        })
        return res.json({ auth: true, token: token})
    }
    res.status(500).json({message: 'Login Inválido'})
})

app.post('/logout', function (req, res){
    res.json({auth: false, token : null})
})

app.get('/clientes', verifyJWT, (req, res) => {
    console.log("Retornou todos clientes!")
    res.json([{id:1,nome:"luiz"}])
})


app.listen(3000 , (req, res) =>{
    console.log("servidor rodando ")
})