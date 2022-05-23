const { Schema, model } = require('mongoose');
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

// const joiSchema = Joi.object({
//   type: Joi.string().required(),
//   category: Joi.string().required(),
//   sum: Joi.string().required(),
//   date: Joi.string().required(),
//   comment: Joi.string(),
//   owner: Joi.objectId().required(),
//   balance: Joi.string().required(),
// });

const Category = model('category', categorySchema);

module.exports = { Category };
// module.exports = { Category, joiSchema };
