import * as commands from "./commands"
// import { console } from "./terminal"
import "./discord/discord"


function neko(data: string | Buffer) {
  const text = data.toString().trim()
  const command = commands[text as keyof typeof commands]
  let consoleOn = true

  if (!command) return

  if (command?.run) {
    if (command.active) {
      return
    }
    command.run()
  }

  if (command.consoleOff == true) {
    consoleOn = false
  }

  if (command.consoleOn == true) {
    consoleOn = true
  }

  if (command.nekoOff == true) {
    process.exit(0)
  }
}


// process.stdin.on("data", console)

process.stdin.on("data", neko)
