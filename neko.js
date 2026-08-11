import * as commands from "./commands";
process.stdin.on("data", (data) => {
    const text = data.toString().trim();
    const command = commands[text];
    if (command) {
        command();
    }
});
