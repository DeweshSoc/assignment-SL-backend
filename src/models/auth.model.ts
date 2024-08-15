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
        expireAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

authSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Auth = mongoose.model('auth',authSchema);


