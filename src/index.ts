import express, { Request, Response } from 'express'

import { shortenUrl, getLongUrl } from './urlService'

const PORT = 4000

const app = express()
app.use(express.json())

app.post('/shorten', (req: Request , res: Response) => {
    const { longUrl } = req.body

    if(!longUrl){
        res.status(400).json('longUrl is required!')
    }
    const shortCode = shortenUrl(longUrl)
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`

    res.status(200).json({shortUrl})
})

app.get('/:shortCode', (req: Request , res: Response) => {
    const { shortCode } = req.params
    const longUrl = getLongUrl(shortCode)

    if(longUrl){
        res.redirect(longUrl)
    } else {
        res.status(404).json({ error: 'URL not found!'})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port 4000')
})