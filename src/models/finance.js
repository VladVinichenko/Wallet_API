const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const trSchema = Schema(
  {
    type: {
      type: String,
      required: [true],
      enum: ['outlay', 'income'],
    },
    category: {
      type: String,
      required: [true],
    },
    sum: {
      type: String,
      required: [true],
    },
    date: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    balance: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

trSchema.plugin(mongoosePaginate);

const Finance = model('transaction', trSchema);

module.exports = { Finance };
