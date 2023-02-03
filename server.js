const express = require('express')
const cors = require('cors')

app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({res:'API is running'})
})

const book_endpoint = require('./routes/api/book')
app.use('/book',book_endpoint)

const stream_endpoint = require('./routes/api/stream')
app.use('/stream',stream_endpoint)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server has started..')
})

