const { Schema, model } = require('mongoose');

const trSchema = Schema({
    type: {
    type: String,
        required: [true],
    enum: ["outlay", "income"],
    },
    category: {
        type: Object,
        required: [true],
    },
    sum: {
        type: String,
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
        type: String
    }
}, { versionKey: false, timestamps: true })


const Transaction = model('transaction', trSchema)

module.exports = { Transaction }