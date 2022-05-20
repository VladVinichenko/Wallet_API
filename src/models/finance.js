const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoosePaginate = require('mongoose-paginate');

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
      type: Number,
      required: [true],
    },
    date: {
      type: Date,
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
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiFinanceSchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.string().required(),
  sum: Joi.string().required(),
  date: Joi.string().required(),
  comment: Joi.string(),
  owner: Joi.objectId().required(),
  balance: Joi.string().required(),
});

trSchema.plugin(mongoosePaginate);

const Finance = model('transaction', trSchema);

module.exports = { Finance, joiFinanceSchema };
