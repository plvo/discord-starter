import { readdirSync } from "fs";
import type { CommandList } from "@/types/command";
import { join } from "path";

export const getPrefixCommandList = (): CommandList[] => {
  const commandPath = join(__dirname, "../commands");
  const commmandFiles = readdirSync(commandPath).filter((f) => f.endsWith(".ts"));

  return commmandFiles.map((file) => {
    return {
      name: file.split(".")[0],
      path: join(commandPath, file),
    };
  });
};
