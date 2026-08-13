import fs from "fs";
import { txtCustom } from "../../txt-custom/txt-custom";

export const hello = {
  consoleOff: false,
  consoleOn: false,
  run: helloRun, 
}


function helloRun() {
  const text = fs.readFileSync(
    new URL("./hello.txt", import.meta.url),
    "utf8"
  )

  console.log(txtCustom(text))

}