import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Feature'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    properties: {
        content: {
            type: String,
            required: true
        }
        // author: User
    }
})

const postModel = mongoose.model('Post', postSchema)

export default postModel