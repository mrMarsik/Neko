export type Platform =
  | "discord"
  | "telegram"
  | "web"


export type NekoContext = {
  platform: Platform
  text: string
  raw?: unknown
}