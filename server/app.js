const express = require('express')
const app = express();
const mongoose = require('mongoose')

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes 
const ClientRoute = require('./routes/clients');

// middlewares 
app.use('/clients', ClientRoute);

app.get('/', (_, res) => {
    res.send('hello world!')
})

// DB Setup
const PORT = 5000 | process.env.PORT
mongoose.connect(`mongodb+srv://admin:ZpJLOWmWGBfpjPzA@cluster0.gu3ql.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => {
    console.log('Server is running at PORT ', PORT)
});


// start the server
app.listen(PORT);
