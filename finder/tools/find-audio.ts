
import { execFile } from 'child_process'
import { promisify } from 'util'

const exec = promisify(execFile)

type Audio = {
  title: string
  url: string
  bitrate: number
}

export async function findAudio(
  query: string
): Promise<string | null> {

  const tracks: Audio[] = []

  // Audius
  try {
    const url = new URL('https://api.audius.co/v1/tracks/search')
    url.searchParams.set('query', query)
    url.searchParams.set('limit', '5')

    const response = await fetch(url)
    if (!response.ok) throw new Error(`Audius: ${response.status}`)

    const result = await response.json()

    for (const track of result.data ?? []) {
      if (track.is_stream_gated) continue

      tracks.push({
        title: `${track.user?.name ?? ''} ${track.title}`,
        url: `https://api.audius.co/v1/tracks/${track.id}/stream`,
        bitrate: 320
      })
    }
  } catch (error) {
    console.error('[AUDIUS]', error)
  }

  // SoundCloud
  try {
    const { stdout } = await exec('yt-dlp', [
      `scsearch5:${query}`,
      '-J',
      '-f', 'bestaudio/best',
      '--ignore-errors'
    ], { maxBuffer: 20 * 1024 * 1024 })

    const result = JSON.parse(stdout)

    for (const track of result.entries ?? []) {
      const audio = track?.requested_downloads?.[0]
      if (!audio?.url) continue

      tracks.push({
        title: track.title ?? '',
        url: audio.url,
        bitrate: audio.abr ?? 0
      })
    }
  } catch (error) {
    console.error('[SOUNDCLOUD]', error)
  }

  const words = query.toLowerCase().split(/\s+/)

  const score = (track: Audio) =>
    words.filter(word =>
      track.title.toLowerCase().includes(word)
    ).length

  tracks.sort((a, b) =>
    score(b) - score(a) || b.bitrate - a.bitrate
  )

  return tracks[0]?.url ?? null
}
