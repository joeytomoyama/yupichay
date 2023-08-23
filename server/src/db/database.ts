import mongoose from 'mongoose'

export async function startDB(url: string): Promise<void> {
    await mongoose.connect(url as string, { useNewUrlParser: true } as mongoose.ConnectOptions)
    console.log(`Connected to database ${url}`)
}