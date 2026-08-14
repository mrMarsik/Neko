import { txtCustom } from "../../txt-custom/txt-custom";


export const exit = {
  consoleOff: false,
  consoleOn: true,
  nekoOff: true,
  active: false,
  run: exitRun, 
}

function exitRun() {
  console.log(txtCustom("bb"));
}