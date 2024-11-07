import { nanoid } from 'nanoid'

const urlDB: { [key: string]: string} = {}

export function shortenUrl(longUrl: string): string {
    const shortUrl = nanoid()
    urlDB[shortUrl] = longUrl
    return shortUrl
}

export function getLongUrl(shortUrl: string): string | null {
    return urlDB[shortUrl] || null
}