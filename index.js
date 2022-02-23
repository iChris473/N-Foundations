
require('dotenv').config({ path: './config.env' })
const express = require('express')
const app = express()
require("./models/mongodb");
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const routes = require("./router/routes")
const private = require("./router/private")
const path = require('path')

app.use("/api", routes)
app.use("/api/private", private)

const port = process.env.PORT || 3000
 
app.use(express.static(path.join(__dirname, './client/build')))

app.get('/', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/profile', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/profile.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/admin', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/admin.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/aboutus', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/aboutus.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/editemail', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/editemail.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/editprofile', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/editprofile.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/editpassword', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/editpassword.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/forgotpassword', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/forgotpassword.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/register', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/register.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/signin', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/signin.html'), (err => err && res.status(500).send(err))
  )
})
app.get('/resetpassword', function(req, res) {
  res.sendFile(
    path.join(__dirname, './client/build/resetpassword.html'), (err => err && res.status(500).send(err))
  )
})



app.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on ${port}`)
})
  

// app.listen(port, () => console.log("Backend Running..."))
