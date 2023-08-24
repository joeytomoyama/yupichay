import express, { Request, Response } from 'express'
import * as Service from './postService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    console.log('get all posts')
    res.status(200).json(await Service.getAllPosts())
})

router.get('/:longitude/:latitude/:radius', async (req: Request, res: Response) => {
    const longitude = parseFloat(req.params.longitude)
    const latitude = parseFloat(req.params.latitude)
    const radius = parseInt(req.params.radius)

    console.log(`get posts in radius ${radius}km from {${longitude}, ${latitude}}`)
    const posts = await Service.getPostsInRadius(longitude, latitude, radius)
    res.json(posts)
})

router.post('/', async (req: Request, res: Response) => {
    const longitude = req.body.location.coordinates[0]
    const latitude = req.body.location.coordinates[1]

    // validate params
    if (longitude < -180 || longitude > 180) return res.status(400).send('longitude must be between -180 and 180')
    if (latitude < -90 || latitude > 90) return res.status(400).send('latitude must be between -90 and 90')

    try {
        const postedPost = await Service.postOnePost(req.body)
        res.status(200).json(postedPost)
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
})

router.put('/:postId/like', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = Service.likePost(postId)

        if (!post) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
})

router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        await Service.deletePost(postId)
        return res.sendStatus(204)
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/nuke', async (req: Request, res: Response) => {
    await Service.nukeAllPosts()
    res.status(204).send('all posts nuked')
})

export default router