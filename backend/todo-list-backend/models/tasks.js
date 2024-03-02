const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    endDate: {
        type: Date,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    }
});

module.exports = mongoose.model("Task", taskSchema);

