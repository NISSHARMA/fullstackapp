
const express = require("express")
const { connection } = require("./connection")
const { registerRoute } = require("./routes/registerroute")
const { noteRouter } = require("./routes/notesroute")
require("dotenv").config()
const cors=require("cors")
const { auth } = require("./middleware/auth.middleware")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user", registerRoute)
app.use(auth)
app.use("/notes", noteRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to Mongo")
    } catch (err) {
        console.log(err)
    }
    console.log("Running Server")
})

