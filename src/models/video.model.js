import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinry url
            required: true
        },
        thumbnail: {
            type: String, //cloudinry url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, //if we upload any video to cloudinary then it will also provide the duration of the video
            required: true
        },
        views: {
            type: Number,
            default: 0 //as much peoeple will watch the video , will increase its value by +1 so keeping default as 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate); //mongoose aggregation pipeline helps to write complex query

export const Video = mongoose.model('Video', videoSchema);