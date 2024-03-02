const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please fill a valid e-mail address"],
        trim: true,
        lowercase: true,
        immutable: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }],
},
    {
        collection: "users",
    }
);

userSchema.virtual("password").set(function (password) {
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    } else {
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        this.hashedPassword = hash;
    }
});

userSchema.methods.authenticate = async function (password) {
    try {
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, this.hashedPassword);
        return isMatch; // true or false
    } catch (error) {
        throw new Error(error);
    }
};

// Omit the hashed password when returning a user
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.hashedPassword;
    return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
