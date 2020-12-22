const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const multer = require('multer')//importation
const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null,'./upload')//define a pasta
    },
    filename: function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)      
    }
})

const upload = multer({storage}).single('arquivo')
app.post('./upload',(req, res)=>{
    upload(req, res, err => {
        if(err){
            return res.end('ocorreu um erro')
        }
        res.end('Concluido com sucesso')
    })
})


app.listen(8080, ()=>console.log('executando'))

