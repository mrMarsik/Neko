import { execFile } from 'child_process'
import { promisify } from 'util'
import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'

import { db } from '../../storage/database/database'


const exec = promisify(execFile)


export type Audio = {
  id: string
  type: 'audio'
  name: string
  path: string
  source: string
}


export async function downloadTrack(
  url: string
): Promise<Audio | null> {

  try {
    const id = createHash('sha256')
      .update(url)
      .digest('hex')


    const directory = path.join(
      process.cwd(),
      'storage/files/audio'
    )

    fs.mkdirSync(directory, {
      recursive: true
    })


    const filePath = path.join(
      directory,
      `${id}.opus`
    )

    const outputTemplate = path.join(
      directory,
      `${id}.%(ext)s`
    )


    const saved = db.prepare(`
      SELECT *
      FROM media
      WHERE id = ?
    `).get(id) as Audio | undefined


    if (saved && fs.existsSync(filePath)) {
      return saved
    }


    const { stdout } = await exec('yt-dlp', [
      url,

      '--skip-download',

      '--print',
      '%(title)s'
    ])

    const name = stdout.trim()


    if (!fs.existsSync(filePath)) {
      await exec('yt-dlp', [
        url,

        '--no-playlist',

        '-x',

        '--audio-format',
        'opus',

        '-o',
        outputTemplate
      ])
    }


    const audio: Audio = {
      id,
      type: 'audio',
      name,
      path: filePath,
      source: url
    }


    db.prepare(`
      INSERT OR REPLACE INTO media (
        id,
        type,
        name,
        path,
        source
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      audio.id,
      audio.type,
      audio.name,
      audio.path,
      audio.source
    )


    return audio

  } catch (error) {
    console.error('downloadTrack:', error)

    return null
  }
}