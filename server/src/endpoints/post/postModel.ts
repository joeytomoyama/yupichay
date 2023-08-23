import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    // author: User,
    likes: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

postSchema.index({ 'geometry.coordinates': '2dsphere' });

const postModel = mongoose.model('Post', postSchema)

export default postModel