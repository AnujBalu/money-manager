const mongoose = require("mongoose")

let CategorySchema = mongoose.Schema({
    formType:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    color:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Category',CategorySchema)
