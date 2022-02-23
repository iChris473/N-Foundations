
const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {

    require('dotenv').config({ path: './config.env' })
    require("./models/mongodb");
    const cors = require("cors")

    const server = express()
    
    const routes = require("./router/routes")
    const private = require("./router/private")

    server.use(cors())
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));

    server.use("/api", routes)
    server.use("/api/private", private)

    server.all('*', (req, res) => {
      return handle(req, res)
    })
  
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on ${port}`)
    })
  })
  

// app.listen(port, () => console.log("Backend Running..."))