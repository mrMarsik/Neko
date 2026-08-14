import { spawn } from "child_process";
import path from "path";
export function snake() {
    const htmlPath = path.join(__dirname, "snake.html");
    const browserTarget = process.platform === "win32"
        ? `"${htmlPath}"`
        : htmlPath;
    const child = spawn(process.platform === "win32" ? "cmd.exe" : "open", process.platform === "win32"
        ? ["/c", "start", "", "", browserTarget]
        : [browserTarget], {
        stdio: "ignore",
        detached: true,
    });
    child.unref();
    console.log("Змейка открыта в отдельном окне.");
}
