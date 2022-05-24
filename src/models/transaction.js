const { Schema, model } = require('mongoose');
const Joi = require('joi');
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

const joiPostSchema = Joi.object({
  type: Joi.string().valid('outlay', 'income').required(),
  category: Joi.string().required(),
  sum: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  date: Joi.string().required(),
  comment: Joi.string(),
});

const joiPaginateSchema = Joi.object({
  page: Joi.number().greater(0),
  limit: Joi.number().greater(0),
});

const joiStatisticsSchema = Joi.object({
  month: Joi.number().min(1).max(12),
  year: Joi.number().min(1970).max(new Date().getFullYear()),
});

trSchema.plugin(mongoosePaginate);

const Transaction = model('transaction', trSchema);

module.exports = {
  Transaction,
  joiPostSchema,
  joiPaginateSchema,
  joiStatisticsSchema,
};
