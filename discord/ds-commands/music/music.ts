import { Message } from "discord.js"
import { MusicPlayer } from "./music-player"


export const music = {
  run: musicRun
}


function musicRun(message: Message) {
  const nekoPlayer = new MusicPlayer(message)
  nekoPlayer.musicRun()
}
