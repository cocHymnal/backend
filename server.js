const express = require('express')
const mongoose = require('mongoose')
const profileRoutes = require('./routes/profileRoutes')
const UserRoute = require('./routes/UsersRoutes')
const AdminRoutes = require("./routes/AdminRoute")

const cors = require('cors');

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', UserRoute)
app.use('/api/profile', profileRoutes)
app.use('/api/admin', AdminRoutes)

mongoose.set('strictQuery', false);

// connect database
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@highscore.muku4gg.mongodb.net/hymnal?retryWrites=true&w=majority`;
mongoose.connect(dbUri, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then((result)=>  console.log('Database connected'))
    .catch((err)=> console.log(err))
app.listen(process.env.PORT, ()=>{
    console.log("Running on port "+ process.env.PORT)
})