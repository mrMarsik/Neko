import * as commands from "./commands";

process.stdin.on("data", (data) => {
  const text = data.toString().trim() as keyof typeof commands;
  const command = commands[text];
  
  if (command) {
    command();
  }
});

