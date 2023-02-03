const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/audio',async(req,res)=>{
    const file_path = path.join(__dirname,'lotr.mp3')
    console.log(file_path)
    fs.exists(file_path,(exists)=>{
        if(exists){
            const rstream = fs.createReadStream(file_path)
            rstream.pipe(res)
        }else{
            return res.json({'err':'There was in a error in audio stream'})
        }
    })

})

module.exports=router