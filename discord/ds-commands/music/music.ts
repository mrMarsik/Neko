import { Message } from "discord.js"
import { MusicPlayer } from "./music-player"


export const music = {
  run: musicRun
}


function musicRun(message: Message) {
  const musicPlayer = new MusicPlayer(message)
  musicPlayer.musicRun()
}
