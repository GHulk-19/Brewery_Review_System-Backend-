const mongoose = require('mongoose')

async function connectTOMongoDB(uri){
    try{
        await mongoose.connect(uri);
        console.log('Connected To DB');
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports = {
    connectTOMongoDB
};