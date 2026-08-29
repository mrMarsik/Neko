import { txtCustom } from "../../txt-custom/txt-custom";
import { NekoContext } from "../../core/types"

export const shop = {
  consoleOff: true,
  consoleOn: false,
  nekoOff: false,
  active: false,
  run: shopRun, 
}


function shopRun(context : NekoContext) {
  console.log(context)
  if (shop.active) {
    return;
  }
  
  shop.active = true

  console.log(
    txtCustom("going to shop...", 'def'),
    shop.active
  );

  
  function shopCall(data: Buffer) {
    const text = data.toString().trim();

    if (text === "back") {
      console.log(txtCustom("ok", 'def'));
      process.stdin.off("data", shopCall);
      shop.active = false;
      return;
    }

    console.log(txtCustom(`shop input: ${text}`, 'def'));
  }

  process.stdin.on("data", shopCall);
}