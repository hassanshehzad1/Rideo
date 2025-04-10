// rideo-user-service/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      required: true,
      type: String,
      trim: true,
      minLength: [3, 'first name must be at least 3 characters long']
    },
    lastName: {
      required: true,
      trim: true,
      type: String,
      minLength: [3, 'Last name must be at least 3 characters long']
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
}, {
  timestamps: true
});

// Hashing password before storing it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generating token
userSchema.methods.authenticateToken = async function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '20h'
  });
  return token;
};

// Compare password
userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;