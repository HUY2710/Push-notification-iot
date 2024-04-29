const express = require('express')
const app = express()

app.use(express.json())

app.use("/api",require('./routes/app'))

app.listen(3000,function(){
    console.log("ready to go")
})