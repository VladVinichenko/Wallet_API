const { Schema, model } = require('mongoose');


const trSchema = Schema({
    type: {
    type: String,
        required: [true],
    enum: ["outlay", "income"],
    },
    category: {
        type: String,
        required: [true],
        enum: ["basic", "foodstuff",'car','careofyourself','children','household','education','leisure','other','regularIncome', 'irregularIncome'], 
    },
    sum: {
        type: Number,
        required: [true],

    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      required:true,
    },
    balance: {
        type: Number
    }

 
}, { versionKey: false, timestamps: true })



const Transaction = model('transaction', trSchema)

module.exports = { Transaction }