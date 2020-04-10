const mongoose = require('mongoose')

// mongodb://127.0.0.1:27017/flashclix-api
// mongodb+srv://htlwienwesterUser:<password>@cluster0-6kjju.mongodb.net/flashclix-test-api?retryWrites=true&w=majority

const db = process.env.MONGODB_URL || "mongodb+srv://htlwienwesterUser:htlwienwestPass@cluster0-6kjju.mongodb.net/flashclix-test-api?retryWrites=true&w=majority"

mongoose.connect(db , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})