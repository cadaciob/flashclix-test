const express = require('express')
const Flashcard = require('../models/flashcard')
const router = new express.Router()

// for testing purpose only
router.get('/testflashcard', (req, res) => {
    res.send('From a new file ./routers/flashcard.js')
})

// //create flashcard
router.post('/flashcards', async (req, res) => {
    const flashcard = new Flashcard(req.body)

    try {
        await flashcard.save()
        res.status(201).send(flashcard)
    } catch(error) {
        res.status(400).send(error)
    }
})

// // read / fetch all flashcards
router.get('/flashcards', async (req, res) => {
    try {
        const flashcard = await Flashcard.find({})
        res.send(flashcard)
    } catch(error) {
        res.status(500).send()
    }
})

// read / fetch flashcards by its id
// async
router.get('/flashcards/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const flashcard = await Flashcard.findById(_id)
        
        if (!flashcard) {
            return res.status(404).send()
        }

        res.send(flashcard)
    } catch(error) {
        res.status(500).send()
    }
})

// update flashcards by its id
// async
router.patch('/flashcards/:id', async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const flashcard = await Flashcard.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!flashcard) {
            return res.status(404).send()
        }

        res.send(flashcard)
    } catch(error) {
        res.status(400).send()
    }
})

router.delete('/flashcards/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const flashcard = await Flashcard.findByIdAndDelete(_id)

        if (!flashcard) {
            return res.status(404).send({ error: 'flashcard not found' })
        }

        res.send(flashcard)
    } catch {
        res.status(500).send()
    }
})

module.exports = router