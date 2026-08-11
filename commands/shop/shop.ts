import { txtCustom } from "../../txt-custom/txt-custom";




function shop(data: Buffer) {
  const text = data.toString().trim();
  
  if (text === "exit") {
    console.log(txtCustom("ok"))
    process.stdin.off("data", shop);
    return;
  }
  
  const test = "Welcome to the shop! Here you can buy items and upgrades for your character."
  console.log(txtCustom(test))
}

process.stdin.on("data", shop);