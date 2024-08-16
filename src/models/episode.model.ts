import mongoose from "mongoose";
import {Project} from "./project.model";

const { String, ObjectId } = mongoose.Schema.Types;

const episodeSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            index: true,
            required: true,
        },
        project: {
            type: ObjectId,
            ref: "Project",
            index: true,
        },
        title:{
            type:String,
            required:true,
            index:true
        },
        status: {
            type: String,
            required: true,
        },
        transcript: {
            type: String,
            required: true,
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// post save hook
episodeSchema.post("save", async function () {
    try {
        const episode = this;
        if (episode) {
            const project = await Project.findOne({ _id: episode.project });
            if (!project) {
                throw Error("invalid project id in episode" + episode._id);
            }
            project.episodes = [...project.episodes, episode._id];
            await project.save();
        }
    } catch (err) {
        console.error(err);
    }
});

export const Episode = mongoose.model("episode", episodeSchema);

