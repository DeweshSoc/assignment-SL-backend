import mongoose from "mongoose";
import { validateProjectTitle } from "../utils";
import { generateInitials } from "../utils/generators";

const { String, ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            index: true,
            required:true
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        episodes: {
            type: [
                {
                    type: ObjectId,
                    ref: "Episode",
                },
            ],
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        initials: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

projectSchema.pre("save", async function (next) {
    if(!this.isModified("title")) next();
    const projectTitle = this.title;
    if (validateProjectTitle(projectTitle)) {
        this.initials = generateInitials(projectTitle);
        next();
    }
    next(Error("invalid project title"));
});

export const Project = mongoose.model("project", projectSchema);

