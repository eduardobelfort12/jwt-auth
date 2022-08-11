const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
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

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({auth: false, message: "No Token provided"})

    jwt.verify(token, process.env.SECRET, function (err, decoded){
        if(err) return res.status(500).json({auth: false, message: "Falha na autenticação do token!"})
        req.userId = decoded.id;
        next()
    })
}
app.listen(3000 , (req, res) =>{
    console.log("servidor rodando ")
})