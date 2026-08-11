import fs from "fs";

const text = fs.readFileSync("./commands/help.txt", "utf8");

export function help() {
  console.log(text)
}