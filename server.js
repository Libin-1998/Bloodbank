var express=require('express')
var mongoose=require('mongoose');
const bloodRoutes = require('./Routes/bloodRoutes');

var app=express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connecting to db

mongoose.connect('mongodb+srv://libinninteen98:EhF3Fs510HyhC9cd@cluster0.4e1hgmr.mongodb.net/bloodbankdatabase?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected successfully');
})
.catch(()=>{
    console.log('connection error');
})

app.use('/api/blood',bloodRoutes)


app.get('/',(req,res)=>{
    res.send('Home')
})


app.listen(1000,()=>{
    console.log('running on 1000');
})