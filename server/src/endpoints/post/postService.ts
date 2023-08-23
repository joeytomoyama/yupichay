import Post from './postModel'
import { PostType } from '../../types'

const earthRadiusInKm = 6371

export async function getAllPosts(): Promise<Array<object>> {
    return await Post.find()
}

export async function getPostsInRadius(longitude: string | number, latitude: string | number, radius: string | number) {
    if (typeof longitude === 'string') longitude = parseFloat(longitude)
    if (typeof latitude === 'string') latitude = parseFloat(latitude)
    if (typeof radius === 'string') radius = parseInt(radius)

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
    // .then(() => console.log('done'))
    // .catch((err) => console.log(err))

    return posts
}

export async function getPostsInRadius2(longitude: string | number, latitude: string | number, radius: string | number) {
    if (typeof longitude === 'string') longitude = parseFloat(longitude)
    if (typeof latitude === 'string') latitude = parseFloat(latitude)
    if (typeof radius === 'string') radius = parseInt(radius)
    
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

export async function nukeAllPosts() {
    return await Post.deleteMany({})
}