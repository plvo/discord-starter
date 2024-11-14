import { fileURLToPath } from "bun";
import { dirname } from "path";
import config from "@/../config.json";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const COMMAND_PREFIX = config.prefix;
