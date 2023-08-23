import Post from './postModel'
import { PostType } from '../../types'

export async function getAllPosts(): Promise<Array<object>> {
    return await Post.find()
}

export async function postOnePost(post: PostType) {//: Promise<PostType> {
    const newPost = new Post({
        "geometry": {
            "coordinates": [
                0,
                0
            ]
        },
        "properties": {
            "content": "Hello World"
        }
    })
    // return await Post.create(post)
    return await newPost.save()
}

export async function nukeAllPosts() {
    return await Post.deleteMany({})
}