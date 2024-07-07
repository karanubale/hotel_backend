const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }
    catch (err) {
        return next(err);
    }
})


personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bycrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;