import { execFile } from 'child_process'
import { promisify } from 'util'


const exec = promisify(execFile)


export async function findAudio(query: string) {
  const sources = [
    `https://audius.co/search/${encodeURIComponent(query)}`,
    `ytsearch1:${query}`
  ]

  for (const source of sources) {
    try {
      const { stdout } = await exec('yt-dlp', [
        source,
        '--skip-download',
        '--print',
        '%(webpage_url)s'
      ])

      const url = stdout.trim()

      if (url) return url
    } catch {}
  }

  return null
}