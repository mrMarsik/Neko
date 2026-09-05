import { MusicCommand } from "./music/music-command";
import { musicConfig } from "./music/config";
import { sportConfig } from "./sport/config";
import { ToxicCommand } from "./toxic/toxic-command";
import { toxicConfig } from "./toxic/config";

export * from "./music/music";
export * from "./toxic/toxic";


export const commands = {
  'm' : { module : MusicCommand, config : musicConfig},
  'м' : { module : MusicCommand, config : musicConfig},
  'neko' : { module : ToxicCommand, config : toxicConfig},
  'неко' : { module : ToxicCommand, config : toxicConfig},
}

