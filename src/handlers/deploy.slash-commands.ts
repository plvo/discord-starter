import { REST, Routes, SlashCommandBuilder, type Client } from "discord.js";
import type { SlashCommand } from "@/types/command";
import { join } from "path";
import { readdirSync } from "fs";
import type { Module } from "@/types/declare";

const slashCommands: SlashCommandBuilder[] = [];

const readSlashCommandDir = async (client: Client) => {
  const slashCommandsPath = join(__dirname, "../slash-commands");
  const slashCommandFiles = readdirSync(slashCommandsPath).filter((f) => f.endsWith(".ts"));

  for (const file of slashCommandFiles) {
    const slashCommandFilePath = join(slashCommandsPath, file);
    
    const { default: slashCommandModule }: Module<SlashCommand> = await import(slashCommandFilePath);
    if (!slashCommandModule) return;

    slashCommands.push(slashCommandModule.data);
    client.slashCommands.set(slashCommandModule.data.name, slashCommandModule);
    
    console.log(`[📞 SLASH COMMAND]`, slashCommandModule.data.name, "is set");
  }
};

export default async function deploySlashCommand(client: Client) {
  try {
    await readSlashCommandDir(client);

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    const putSlashCommands = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
        body: slashCommands.map((c) => c.toJSON()),
      }
    ) as unknown[];
    
    console.log(`[✅ SUCCESS] Successfully loaded ${putSlashCommands.length} slash commands.`);
    
  } catch (error) {
    console.error(error);
  }
}
