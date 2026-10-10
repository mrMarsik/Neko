import { execFile } from 'child_process'
import { promisify } from 'util'


const exec = promisify(execFile)


export async function findAudio(
  query: string
): Promise<string | null> {

  const sources = [
    `https://audius.co/search/${encodeURIComponent(query)}`,
    `ytsearch1:${query}`
  ]


  for (const source of sources) {
    try {
      const { stdout } = await exec('yt-dlp', [
        source,

        '--format',
        'bestaudio/best',

        '--get-url'
      ])


      const url = stdout
        .trim()
        .split('\n')[0]


      if (url) return url

    } catch {}
  }


  return null
}