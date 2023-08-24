import Post from './postModel'
import { PostType } from '../../types'

const earthRadiusInKm = 6378.1 //6371

export async function getAllPosts(): Promise<Array<PostType>> {
    return await Post.find()
}

export async function getPostsInRadius(longitude: number, latitude: number, radius: number): Promise<Array<object>> {
    const posts = await Post.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [ longitude, latitude ],
              radius / earthRadiusInKm
            ]
          }
        }
    })

    return posts
}

export async function getPostsInRadius2(longitude: number, latitude: number, radius: number) {
    const specifiedLocation = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }
    
    return await Post.aggregate([
        {
            $geoNear: {
                near: specifiedLocation as any,
                distanceField: 'distance',
                maxDistance: radius,
                spherical: true
            }
        }
    ])
}

export async function postOnePost(post: PostType) {
    return await Post.create(post)
}

export async function likePost(postId: string) {
    return await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } }, // Increment the 'likes' field by 1
        { new: true } // Return the updated comment
    )
}

export async function deletePost(postId: string) {
    return await Post.findByIdAndDelete(postId)
}

export async function nukeAllPosts() {
    return await Post.deleteMany({})
}