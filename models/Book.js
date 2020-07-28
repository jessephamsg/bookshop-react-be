const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    avgRating: {
        type: String,
        default: 0
    },
    format: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    purchaseQty: {
        type: String,
        default: 0
    },
    arrivedOn: String,
    daysFromArrival: Number,
    reviews: [{
        body: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    dimensions: {
        width: Number,
        height: Number,
        thickness: Number
    },
    rating: [{
        body: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

BookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('inventories', BookSchema);
module.exports = Book