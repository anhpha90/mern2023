require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
const connectDB = async() => {
    try{
await mongoose.connect(`mongodb+srv://anhpha90:Nhuquynh88@learnit.zx2ykbs.mongodb.net/?retryWrites=true&w=majority`,
{
    
useNewUrlParser: true,
useUnifiedTopology:true,
// useFindAndModify:false
}
)
console.log('Mongodb Connected')}
    catch(error){
console.log(error)
process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
const corsOptions = { origin: ["https://heroku.com/apps/tranquil-plains-60774", "https://heroku.com/apps/tranquil-plains-60774"], credentials: true }
app.use(cors(corsOptions));
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`server running on ${PORT}`))