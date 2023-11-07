//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.
const mongoose = require('mongoose')

//cupcake schema for database
const postSchema = mongoose.Schema(
    {
        title:{type: String, required:true},
        department: {type: String, required:true},
        body: {type: String, required:true},
        dateAdded: {type: String, required:true}
    }
);

module.exports = mongoose.model('Post', postSchema);