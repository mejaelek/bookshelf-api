const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [1, 'Title must be at least 1 character'],
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: [true, 'Author reference is required'],
        },
        isbn: {
            type: String,
            required: [true, 'ISBN is required'],
            unique: true,
            trim: true,
            match: [/^(97(8|9))?\d{9}(\d|X)$/, 'Please provide a valid ISBN-10 or ISBN-13'],
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            trim: true,
            enum: {
                values: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography', 'History', 'Self-Help', 'Horror', 'Romance', 'Other'],
                message: '{VALUE} is not a supported genre',
            },
        },
        publishedYear: {
            type: Number,
            required: [true, 'Published year is required'],
            min: [1450, 'Published year must be 1450 or later'],
            max: [new Date().getFullYear(), `Published year cannot exceed ${new Date().getFullYear()}`],
        },
        language: {
            type: String,
            required: [true, 'Language is required'],
            trim: true,
            default: 'English',
            maxlength: [30, 'Language cannot exceed 30 characters'],
        },
        pageCount: {
            type: Number,
            required: [true, 'Page count is required'],
            min: [1, 'Page count must be at least 1'],
            max: [10000, 'Page count cannot exceed 10,000'],
        },
        summary: {
            type: String,
            required: [true, 'Summary is required'],
            trim: true,
            minlength: [20, 'Summary must be at least 20 characters'],
            maxlength: [2000, 'Summary cannot exceed 2000 characters'],
        },
        coverImageUrl: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, 'Cover image URL must start with http or https'],
            default: null,
        },
        rating: {
            type: Number,
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating cannot exceed 5'],
            default: null,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Book', bookSchema);