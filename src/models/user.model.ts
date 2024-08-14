import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";

const { String, ObjectId } = mongoose.Schema.Types;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        projects: {
            type: [
                {
                    type: ObjectId,
                    ref: "Project",
                },
            ],
            required: true,
        },
    },
    {
        timestamps: true,
        methods: {
            async comparePasswords(passwordToMatch: string) : Promise<Boolean>{
                return await bcrypt.compare(
                    passwordToMatch,
                    this.password
                );
            },
        },
    }
);

userSchema.pre("save", async function (next) {
    try {
        const user = this;
        if (!user.isModified("password")) return next();
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

export const User = mongoose.model("user", userSchema);
