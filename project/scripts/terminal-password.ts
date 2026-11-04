import { stdin, stdout } from "node:process";
import { emitKeypressEvents, type Key } from "node:readline";
export async function readMaskedPassword(prompt: string) {
  stdout.write(prompt);
  const previousRawMode = stdin.isRaw;
  emitKeypressEvents(stdin);
  stdin.setRawMode(true);
  stdin.resume();
  return new Promise<string>((resolve, reject) => {
    const characters: string[] = [];
    function onKey(value: string | undefined, key: Key) {
      if (key.ctrl && (key.name === "c" || key.name === "d")) {
        cleanup();
        reject(new Error("Cancelled"));
        return;
      }
      if (key.name === "return" || key.name === "enter") {
        cleanup();
        resolve(characters.join(""));
        return;
      }
      if (key.name === "backspace") {
        if (characters.length) {
          characters.pop();
          stdout.write("\b \b");
        }
        return;
      }
      if (key.ctrl || key.meta || !value || key.sequence?.startsWith("\u001b"))
        return;
      for (const character of value)
        if (character >= " " && character !== "\u007f") {
          characters.push(character);
          stdout.write("*");
        }
    }
    function cleanup() {
      stdin.off("keypress", onKey);
      stdin.setRawMode(Boolean(previousRawMode));
      stdin.pause();
      stdout.write("\n");
    }
    stdin.on("keypress", onKey);
  });
}
