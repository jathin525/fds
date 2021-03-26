const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let shopDetails = new Schema({
    
    name: { 
        type: String
    },
    description: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    rating: {
        type: Number
    },
    review: {
        type: [String]
    },
    timing: {
        type: String
    },
    offers: {
        type: String
    },
    specials: {
        type: String
    },
    sales: {
        type: String
    },
});

const Admin=mongoose.model('shopDetails',shopDetails);
module.exports=Admin;

