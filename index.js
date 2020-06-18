const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const product=require('./routes/product')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url='mongodb+srv://akash:8196044188@cluster0-f5vu7.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

console.log('passed')
app.use('/',product);

// app.use('/',async (req,res)=>{
//     console.log('It is Working');
// })
app.listen(3000,()=>{
    console.log('running at port 3000');

});
