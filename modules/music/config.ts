import { Platform } from "../../core/types"

export const musicConfig: {
  name: string
  adapters: Platform[]
} = {
  name: "music",

  adapters: [
    "discord",
  ]
}