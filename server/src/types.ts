export interface PostType {
    type?: string,
    geometry: {
        type?: string,
        coordinates: Array<number>
    },
    properties: {
        content: string
    }
}