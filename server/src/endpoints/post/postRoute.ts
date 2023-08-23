import express, { Request, Response } from 'express'
import * as Service from './postService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    console.log('get all posts')
    res.status(200).json(await Service.getAllPosts())
})

router.get('/:longitude/:latitude/:radius', async (req: Request, res: Response) => {
    console.log(`get posts in radius ${req.params.radius}km from {${req.params.longitude}, ${req.params.latitude}}`)
    const posts = await Service.getPostsInRadius(req.params.longitude, req.params.latitude, req.params.radius)
    res.json(posts)
})

router.post('/', async (req: Request, res: Response) => {
    const postedPost = await Service.postOnePost(req.body)
    res.json(postedPost)
})

router.delete('/nuke', async (req: Request, res: Response) => {
    await Service.nukeAllPosts()
    res.status(204).send('all posts nuked')
})

export default router