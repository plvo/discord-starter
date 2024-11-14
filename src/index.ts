import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import deploySlashCommand from "@/handlers/deploy.slash-commands";
import type { Command, SlashCommand } from "@/types/command";
import listenSlashCommand from "@/listeners/slash-command";
import listenNewMessage from "@/listeners/new-message";

const client = new Client<true>({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection<string, Command>();
client.slashCommands = new Collection<string, SlashCommand>();

await deploySlashCommand(client);

listenSlashCommand(client);
listenNewMessage(client);

client.on(Events.ClientReady, () => {
  console.log(
    `[✅ LOGGED] ${
      client.user.username + "#" + client.user.discriminator
    } is logged`
  );
});

client.login(process.env.TOKEN);
