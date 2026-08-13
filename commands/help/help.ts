import fs from "fs";
import { txtCustom } from "../../txt-custom/txt-custom"


export const help = {
  consoleOff: false,
  consoleOn: false,
  run: helpRun, 
}


function helpRun() {
  const text = fs.readFileSync(
    new URL("./help.txt", import.meta.url),
    "utf8"
  )
  
  console.log(txtCustom(text))
}