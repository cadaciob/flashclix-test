const mongoose = require('mongoose')

const Flashcard = mongoose.model('Flashcard', {
    title: {         
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    tags:  {
        type: [String]
    },
    category: {
        type: String,
        default: "empty"
    },
    category1: {
        enum: ['Programmieren', 'Mathematik', 'English']
    },
    private: {
        type: Boolean,
        default: false
    }
})

module.exports = Flashcard