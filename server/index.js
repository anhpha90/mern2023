require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


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
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`server running on ${PORT}`))