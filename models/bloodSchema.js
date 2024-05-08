var mongoose=require('mongoose')
var bloodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    bloodgroup:{type:String,required:true},
    place:{type:String,required:true},
    contact:{type:Number,required:true},
})


module.exports=mongoose.model('blooodbank',bloodSchema)