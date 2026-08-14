import * as commands from "./commands";
import { txtCustom } from "./txt-custom/txt-custom";

export function console(data: Buffer) {
  const text = data.toString().trim()
  const command = commands[text as keyof typeof commands]

  if (command?.run) {
    command.run()
  } 
}

process.stdin.on("data", console)