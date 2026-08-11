import { txtCustom } from "../../txt-custom/txt-custom";


export function shop() {
  
  const test = "Welcome to the shop! Here you can buy items and upgrades for your character."
  console.log(txtCustom(test))
  
  
  process.stdin.on("data", (data) => {
  const text = data.toString().trim()
  

  if (text === "exit") {

    console.log(txtCustom("ok"))
    process.exit()

  } else {

    console.log(txtCustom(text))}

  })
}