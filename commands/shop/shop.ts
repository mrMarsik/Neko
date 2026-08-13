import { txtCustom } from "../../txt-custom/txt-custom";


export const shop = {
  consoleOff: true,
  consoleOn: false,
  run: shopRun, 
}


function shopRun() {
  console.log(
    txtCustom("Welcome to the shop! Here you can buy items and upgrades for your character.")
  );

  function shopCall(data: Buffer) {
    const text = data.toString().trim();

    if (text === "exit") {
      console.log(txtCustom("ok"));
      process.stdin.off("data", shopCall);

      return;
    }

    console.log(txtCustom(`shop input: ${text}`));
  }

  process.stdin.on("data", shopCall);
}