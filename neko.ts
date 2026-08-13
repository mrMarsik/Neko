import * as commands from "./commands";
import { txtCustom } from "./txt-custom/txt-custom";


function nekoCall(data: Buffer) {
  const text = data.toString().trim()
  const command = commands[text as keyof typeof commands]

  if (command?.consoleOff) {
    process.stdin.off("data", nekoCall)
  }

  if (command.run) {
    command.run()
  }

  if (command?.consoleOn) {
    process.stdin.on("data", nekoCall)
  }  
}

process.stdin.on("data", nekoCall)
