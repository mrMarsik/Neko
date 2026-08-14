import { Message } from "discord.js"
import { Player } from "discord-player"
import { YouTubeDlpExtractor } from "discord-player-youtubedlp"
import { music as replies } from "../../replies"
import { txtCustom } from "../../../txt-custom/txt-custom"

let player: Player | null = null
let initialized = false


export const music = {
  run: musicRun
}


async function initPlayer(message: Message) {
  if (!player) {
    player = new Player(message.client)

    player.events.on("error", (queue, error) => {
      console.error("QUEUE ERROR:", error)
    })

    player.events.on("playerError", (queue, error) => {
      console.error("PLAYER ERROR:", error)
    })
  }

  if (!initialized) {
    await player.extractors.register(
      YouTubeDlpExtractor,
      {
        agent: {
          cookiesFromBrowser: "chrome"
        }
      }
    )

    initialized = true
  }

  return player
}


async function musicRun(message: Message) {
  const channel = message.member?.voice.channel

  if (!channel) {
    await message.reply(replies.joinVoice)
    return
  }


  const query = message.content
    .replace(/^music\s*/i, "")
    .trim()

  if (!query) {
    await message.reply(replies.enterSong)
    return
  }


  try {
    const musicPlayer = await initPlayer(message)

    const result = await musicPlayer.play(
      channel,
      query,
      {
        nodeOptions: {
          metadata: {
            channel: message.channel,
            user: message.author
          }
        }
      }
    )


    await message.reply(replies.trackTitle.replace("{0}", result.track.title))
  } catch (error) {
    console.error("MUSIC ERROR:", error)

    await message.reply(
      replies.musicError
    )
  }
}