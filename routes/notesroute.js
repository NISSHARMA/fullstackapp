
const express = require("express")
const noteRouter = express.Router()
const jwt = require("jsonwebtoken")
const { NoteModel } = require("../model/notemodel")

noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "masai")
    try {
        if (decoded) {
            const notes = await NoteModel.find({ "userID": decoded.userID })
            res.status(200).send(notes)
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "new note has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
    res.status(200).send("Hello")
})

noteRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params
    const payload = req.body
    try {
        await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "New note has been updated" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    /*  const token = req.headers.authorization
      const decoded = jwt.verify(token, "masai")   
      const reqID = decoded.userID
      const note = NoteModel.findOne({ _id: noteID })
     // console.log(note)
      const userID_in_note = note.userID
     // console.log(reqID  , noteID)*/
    try {
        if (noteID) {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.status(200).send({ "msg": "New note has been deleted" })
        } else {
            res.status(400).send({ "msg": "not authorised" })
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})



module.exports = {
    noteRouter
}