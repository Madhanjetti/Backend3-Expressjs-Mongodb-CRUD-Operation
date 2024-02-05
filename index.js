const express=require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


//create model in mongodb
const User = mongoose.model('User', { //users
    firstName: String,
    lastName: String,
    phone: Number
  })
  /*
  const Book = mongoose.model('book', { //book
    firstName: String,
    lastName: String,
    phone: Number
  })
  */


app.get('/', (req, res) => {
    res.json({
      message: 'All good!'
    })
  })

    //Get method used to get data from DB
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({})
      res.json({
        status: 'SUCCESS',
        data: users
      })
    } catch (error) {
      res.json({
        status: 'FAILED',
        message: 'Something went wrong'
      })
    }
  })

  //post method for inserting data into db

  app.post('/users', async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body
      await User.create({ firstName, lastName, phone })
      res.json({
        status: 'SUCCESS',
        message: 'User created successfully'
      })
    } catch (error) {
      res.json({
        status: 'FAILED',
        message: 'Something went wrong'
      })
    }
  })

  //update method for updating data in db

  app.patch('/users/:id', async (req, res) => {
    try {
      const { id } = req.params
      const { firstName, lastName, phone } = req.body
      await User.findByIdAndUpdate(id, { firstName, lastName, phone })
      res.json({
        status: 'SUCCESS',
        message: 'User updated successfully'
      })
    } catch (error) {
      res.json({
        status: 'FAILED',
        message: 'Something went wrong'
      })
    }
  })
  
  //delete method for deleting data from db

  app.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params
      await User.findByIdAndDelete(id)
      res.json({
        status: 'SUCCESS',
        message: 'User deleted successfully'
      })
    } catch (error) {
      res.json({
        status: 'FAILED',
        message: 'Something went wrong'
      })
    }
  })


  app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
      .then(() =>  console.log(`Server running on http://localhost:${process.env.PORT}`))
      .catch((error) => console.log(error))
  })  

  /* HTTP Methods: (REST APIs - CRUD operations)
  - GET (READ - R)
  - POST (CREATE - C)
  - PUT/PATCH (UPDATE - U)
  - DELETE (DELETE -D)

  CRUD -
  1. List all students: GET /students (READ)
  2. Create a new student: POST /students (CREATE)
  3. Update student information: PATCH /students/:id (UPDATE)
  4. Delete student information: DELETE /students/:id (DELETE)
  */