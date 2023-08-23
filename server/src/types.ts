export interface PostType {
    message: string,
    likes?: number,
    location: {
        type?: string,
        coordinates: Array<number>
    },
}