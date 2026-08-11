import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const notesFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "notes.txt");

export function notes() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Введите текст заметки: ", (answer) => {
    const note = answer.trim();

    if (!note) {
      console.log("Заметка не сохранена: текст пустой.");
      rl.close();
      return;
    }

    fs.appendFileSync(notesFile, `${new Date().toISOString()} - ${note}\n`, "utf8");
    console.log(`Заметка сохранена в ${notesFile}`);
    rl.close();
  });
}
