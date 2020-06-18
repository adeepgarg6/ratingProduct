const mongoose=require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ratings:[],
    totalRatings:{ type: Number, required: true },
    avgRating: { type: Number, required: true },
    customers:[]
});

module.exports = mongoose.model('Product', productSchema);