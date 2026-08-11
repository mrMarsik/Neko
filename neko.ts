import * as commands from "./commands";
import { txtCustom } from "./txt-custom/txt-custom";


process.stdin.on("data", (data) => {
  const text = data.toString().trim() as keyof typeof commands;
  const command = commands[text];
  
  if (command) {
    command();
  } else {
//    console.log(txtCustom(`...`));
  }
});

