import express, { Request, Response } from 'express'
import * as Service from './postService'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    console.log('get all posts')
    res.status(200).json(await Service.getAllPosts())
})

router.get('/:epicenter/:radius', (req: Request, res: Response) => {
    res.send(`epicenter: ${req.params.epicenter}, radius: ${req.params.radius}`)
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