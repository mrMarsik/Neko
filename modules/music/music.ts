import { spawn } from "node:child_process"
import play from "play-dl"


export type Song = {
  title: string
  url: string
}


export class Music {
  songs: Song[] = []
  currentIndex = 0


  async search(query: string) {
    const result = await play.search(
      query,
      {
        limit: 5
      }
    )


    this.songs = result.map(song => ({
      title: song.title ?? "Unknown",
      url: song.url
    }))


    this.currentIndex = 0

    return this.songs
  }


  current() {
    return this.songs[this.currentIndex]
  }


  select(index: number) {
    const song = this.songs[index]

    if (!song) return

    this.currentIndex = index

    return song
  }


  next() {
    if (!this.songs.length) return


    this.currentIndex++

    if (
      this.currentIndex >=
      this.songs.length
    ) {
      this.currentIndex = 0
    }


    return this.current()
  }


  previous() {
    if (!this.songs.length) return


    this.currentIndex--

    if (this.currentIndex < 0) {
      this.currentIndex =
        this.songs.length - 1
    }


    return this.current()
  }


  createStream(song: Song) {
    const process = spawn(
      "yt-dlp",
      [
        "--cookies-from-browser",
        "chrome",

        "--js-runtimes",
        "node",

        "--remote-components",
        "ejs:github",

        "-f",
        "bestaudio",

        "-o",
        "-",

        song.url
      ],
      {
        stdio: [
          "ignore",
          "pipe",
          "inherit"
        ]
      }
    )


    return process.stdout
  }
}