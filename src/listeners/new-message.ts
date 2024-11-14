import { Events, type Client } from "discord.js";
import { getPrefixCommandList } from "@/handlers/get.prefix-command";
import { COMMAND_PREFIX } from "@/lib/constant";
import type { Command } from "@/types/command";
import type { Module } from "@/types/declare";

export default function listenNewMessage(client: Client): void {
  client.on(Events.MessageCreate, async (message) => {
    if (
      message.author.bot ||
      message.channel.type === 1 || // DM
      !message.content.startsWith(COMMAND_PREFIX)
    )
      return;

    try {
      const { content, author } = message;

      const [commandName, ...commandArgs] = message.content.slice(1).split(" ");

      const command = getPrefixCommandList().find((c) => c.name === commandName);
      if (!command) return;

      const { default: commandModule }: Module<Command> = await import(command.path);
      if (!commandModule) return;

      commandModule.execute(message, commandArgs);
    } catch (error) {
      console.error(`[❌ ERROR] ${error}`);
    }
  });
}
