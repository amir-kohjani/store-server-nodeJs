const uniqueValidator = require('mongoose-unique-validator');
const shortUniqId = require('short-unique-id')
const mongoose = require('mongoose');
// const ColorSchema = require('./ColorSchema');

const uid = new shortUniqId({
    dictionary: 'number',
    length: 6
});
const sulgId = new shortUniqId({
    dictionary: 'number',
    length: 7
})

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => uid()
    },
    slug:{
        type:String,
        required: true,
        default: () => sulgId()
    },
    title: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100,

    },
    image:{
        type: String,
        required: true
    },
    images:{
        type:[String],
        required: true
    },
    category: [{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    }],
    price: {
        type: 'number',
        required: true,
    },
    discount: {
        type: 'number',
        required: false,
        minLength: 10,
        maxLength: 100
    },
    off_price: {
        type: "number",
        required: function () {
            return this.discount;
        },
        default: function () {
            return this.discount ? this.price - ((this.price * this.discount) / 100) : null;
        },

    },
    information: {
        type: [String],
        required: true,
    },
    brand: {
        type: "string",
    },
    color: { 
        type: [String],
         required: true
         },

    sizes: {
        type: [String],
         required: true
    },
    stock: {
        type: Number,
        default: 1,
    },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now }


})

productSchema.plugin(uniqueValidator);
// productSchema.methods.getProductsByCategory = function getProductsByCategory(category){

// }
// productSchema.methods.setDiscount = function setDiscount() {
//     this.priceWithDiscount = this.discount ? this.price - ((this.price * this.discount) / 100) : null
// }
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;