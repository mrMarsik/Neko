import { txtCustom } from "../../txt-custom/txt-custom";


export const exit = {
  consoleOff: false,
  consoleOn: true,
  run: exitRun, 
}

function exitRun() {
  console.log(txtCustom("bb"));
}