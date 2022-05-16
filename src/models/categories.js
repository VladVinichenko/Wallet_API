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

const Category = model('category', categorySchema);

module.exports = { Category };
