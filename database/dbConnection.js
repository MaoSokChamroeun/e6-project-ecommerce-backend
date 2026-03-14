const mongoose = require('mongoose')

const connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('Connection success')
    }catch(error){
        console.log('Fail to connection db');
    }
}

module.exports = connection