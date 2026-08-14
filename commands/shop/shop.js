import { txtCustom } from "../../txt-custom/txt-custom";
export const shop = {
    consoleOff: true,
    consoleOn: false,
    nekoOff: false,
    active: false,
    run: shopRun,
};
function shopRun() {
    if (shop.active) {
        return;
    }
    shop.active = true;
    console.log(txtCustom("going to shop..."), shop.active);
    function shopCall(data) {
        const text = data.toString().trim();
        if (text === "back") {
            console.log(txtCustom("ok"));
            process.stdin.off("data", shopCall);
            shop.active = false;
            return;
        }
        console.log(txtCustom(`shop input: ${text}`));
    }
    process.stdin.on("data", shopCall);
}
