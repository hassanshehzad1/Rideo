// rideo-user-service/models/blacklist.model.js
import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60 // 24 hours expiry
    }
}, { timestamps: true });

const blackList = mongoose.model("blackList", blackListSchema);
export default blackList;