import mongoose from "mongoose";

const { String, ObjectId } = mongoose.Schema.Types;

const authSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            unique: true,
            index: true,
        },
        token: {
            type: String,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Auth = mongoose.model('auth',authSchema);


