import fs from 'fs'
import path from 'path'

import { randomUUID } from 'crypto'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'


export type DownloadedFile = {
  id: string
  path: string
}


export async function download(
  url: string
): Promise<DownloadedFile | null> {

  const response = await fetch(url)

  if (!response.ok || !response.body) {
    return null
  }


  const id = randomUUID()

  const directory = path.join(
    process.cwd(),
    'lumen/quarantine'
  )

  await fs.promises.mkdir(
    directory,
    { recursive: true }
  )


  const filePath = path.join(
    directory,
    id
  )


  const stream = fs.createWriteStream(
    filePath,
    { flags: 'wx' }
  )


  await pipeline(
    Readable.fromWeb(response.body as any),
    stream
  )


  return {
    id,
    path: filePath
  }
}
