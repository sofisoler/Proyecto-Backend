const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = 'users';

const UserSchema = new Schema({
    full_name: String,
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    password: String,
    last_connection: Date
});

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function(next) {
    this.full_name = `${this.first_name} ${this.last_name}`;
    next();
});

const userModel = model(collection, UserSchema);

module.exports = {
    userModel
};