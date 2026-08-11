import fs from "fs";
import { txtCustom } from "../../txt-custom/txt-custom";
export function help() {
    const text = fs.readFileSync(new URL("./help.txt", import.meta.url), "utf8");
    console.log(txtCustom(text));
}
