import { Platform } from "../../core/types"

export const toxicConfig: {
  name: string
  adapters: Platform[]
} = {
  name: "toxic",

  adapters: [
    "discord",
  ]
}