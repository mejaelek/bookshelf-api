const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [1, 'First name must be at least 1 character'],
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [1, 'Last name must be at least 1 character'],
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        birthDate: {
            type: Date,
            required: [true, 'Birth date is required'],
        },
        nationality: {
            type: String,
            required: [true, 'Nationality is required'],
            trim: true,
            maxlength: [60, 'Nationality cannot exceed 60 characters'],
        },
        biography: {
            type: String,
            required: [true, 'Biography is required'],
            trim: true,
            minlength: [20, 'Biography must be at least 20 characters'],
            maxlength: [2000, 'Biography cannot exceed 2000 characters'],
        },
        genres: {
            type: [String],
            required: [true, 'At least one genre is required'],
            validate: {
                validator: (arr) => arr.length > 0,
                message: 'At least one genre must be provided',
            },
        },
        website: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, 'Website must be a valid URL starting with http or https'],
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Author', authorSchema);
