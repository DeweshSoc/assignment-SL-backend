import mongoose from "mongoose";
import { validateProjectTitle } from "../utils";
import { generateInitials } from "../utils/generators";
import { User } from "./user.model";

const { String, ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            index: true,
            required: true,
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
            default: "pending",
        },
        initials: {
            type: String,
        },
        colorHex: {
            type: String,
            default: "#f8a01d",
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.pre("save", async function (next) {
    if (!this.isModified("title")) next();
    const projectTitle = this.title;
    if (validateProjectTitle(projectTitle)) {
        this.initials = generateInitials(projectTitle);
        next();
    }
    next(Error("invalid project title"));
});

projectSchema.post("save", async function () {
    try {
        const project = this;
        if (project) {
            const user = await User.findOne({ _id: project.user });
            if (!user) {
                throw Error("invalid user id in project" + project._id);
            }
            user.projects = [...user.projects, project._id];
            await user.save();
            console.log("Add project to user");
        }
    } catch (err) {
        console.error(err);
    }
});

export const Project = mongoose.model("project", projectSchema);
