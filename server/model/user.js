const { Schema, model } = require("mongoose");

const userSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },

  twoFactorSecret: {
    type: String,
    default: undefined,
  },

  tokenVersion: {
    type: Number,
    default: 0,
  },

  resetPasswordToken: {
    type: String,
    default: undefined,
  },

  resetPasswordExpires: {
    type: Date,
    default: undefined,
  },

},
{
  timestamps: true,
}
);

const User = model("User", userSchema);

module.exports = User;