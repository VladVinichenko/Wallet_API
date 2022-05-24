const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    color: {
      type: String,
      required: [true],
    },
  },
  { versionKey: false, timestamps: true },
);

const Category = model('category', categorySchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
});

module.exports = { Category, joiSchema };
