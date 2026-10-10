import http from 'http'
import fs from 'fs'
import path from 'path'

import { getMedia } from './database/database'


const PORT = 7000


export function startMediaServer() {
  const server = http.createServer((req, res) => {
    if (!req.url) {
      res.writeHead(400)
      res.end()
      return
    }


    const match = req.url.match(/^\/media\/([^/?#]+)$/)

    if (!match) {
      res.writeHead(404)
      res.end()
      return
    }


    const mediaId = match[1]
    const media = getMedia(mediaId)

    if (!media) {
      res.writeHead(404)
      res.end()
      return
    }


    const filePath = path.resolve(
      process.cwd(),
      media.path
    )

    if (!fs.existsSync(filePath)) {
      res.writeHead(404)
      res.end()
      return
    }


    const stat = fs.statSync(filePath)

    res.writeHead(200, {
      'Content-Type': media.mime,
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=31536000, immutable'
    })


    fs.createReadStream(filePath).pipe(res)
  })


  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
}
