import { MusicCommand } from "./music/music-command";
import { musicConfig } from "./music/config";
import { sportConfig } from "./sport/config";


export * from "./music/music";



export const commands = {
  'm' : { module : MusicCommand, config : musicConfig},
  'м' : { module : MusicCommand, config : musicConfig},
}

