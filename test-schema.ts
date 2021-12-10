import mongoose, { mongo } from 'mongoose'

const schema = new mongoose.Schema({
    // A schema is a blueprint of how our data should be structured 
    message:{
        type:String,
        required: true
    }
})

export default mongoose.model('testing', schema, 'testing')