import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    _id: string,
    title: string,
    author: string,
    content: string,
    comments: string[],
    date: string,
    __v: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await fetch(process.env.DATABASE_URL + '/api/v1/blogs')
    const data = await response.json()
    res.status(200).json(data)
}
