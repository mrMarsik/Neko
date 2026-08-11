import fs from "fs";
import { txtCustom } from "../../txt-custom/txt-custom";
export function hello() {
    const text = fs.readFileSync(new URL("./hello.txt", import.meta.url), "utf8");
    console.log(txtCustom(text));
}
