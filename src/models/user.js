const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(1).max(12),
  email: Joi.string()
    .email()
    .regex(/^[A-Za-z0-9+_.-]+@(.+)$/)
    .min(10)
    .max(63)
    .required(),
  password: Joi.string().min(6).max(16).required(),
});

const User = model('user', userSchema);

module.exports = { User, joiSchema };
