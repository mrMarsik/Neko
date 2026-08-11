import { spawn } from "child_process";
import path from "path";
export function snake() {
    const htmlPath = path.join(__dirname, "snake.html");
    const openCommand = process.platform === "win32"
        ? "cmd.exe"
        : process.platform === "darwin"
            ? "open"
            : "xdg-open";
    const openArgs = process.platform === "win32"
        ? ["/c", "start", "", htmlPath]
        : [htmlPath];
    const child = spawn(openCommand, openArgs, {
        stdio: "ignore",
        detached: true,
    });
    child.unref();
    console.log("Открываю змейку в отдельном окне...");
}
