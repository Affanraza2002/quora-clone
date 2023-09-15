const mongoose =require('mongoose');

const url="mongodb+srv://quora_user:quora_123@cluster0.g2advxa.mongodb.net/quora-clone-mern?retryWrites=true&w=majority";

module.exports.connect =() =>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('MongoDb Connected Successfully')
    }).catch((error)=> console.log("Error: ",error))
}