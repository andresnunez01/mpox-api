import mongoose from "mongoose";
const mpoxSchema = new mongoose.Schema({
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    creationDate:{
        type: Date,
        required: false,
        default: Date.now
    },
    isSent:{
        type: Boolean,
        required: false,
        default: false
    },
});

export const MpoxModel = mongoose.model('Mpox', mpoxSchema);