import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "First name should be at least 3 characters long"],
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Last name should be at least 3 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should be at least 6 characters long"],
        select: false,
    },
    socketId: {
        type: String
    },
    vehicle: {
        type: {
            type: String,
            required: [true, "Please enter a vehicle type"],
            enum: ["car", "bike", "auto"],
        },
        licensePlate: {
            type: String,
            required: [true, "Please enter a license plate number"],
            unique: true,
        },
        model: {
            type: String,
            required: [true, "Please enter a model of the vehicle"],
            trim: true,
        },
        color: {
            type: String,
            required: [true, "Please enter a color of the vehicle"],
            trim: true,
        },
        capacity: {
            type: Number,
            required: true,
            default: 1,
            min: [1, "Capacity should be at least 1"] // minLength nahi, min use karo
        }
    },
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline", "busy"],
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
}, {
    timestamps: true
});

// Hashing password
captainSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate token
captainSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// 2dsphere Index for geospatial queries
captainSchema.index({ location: "2dsphere" });

const CaptainModel = mongoose.model("Captain", captainSchema);
export default CaptainModel;