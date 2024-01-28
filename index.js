const express = require("express")
const helmet = require("helmet")
const cors = require('cors')
// const config = require('./config/config');
require("./config/db")
const userRoutes = require("./routes/userRoutes")
const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

// Routes
app.use(userRoutes)

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
  });
  

// Start Server
PORT = process.env.PORT || 8080,
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))