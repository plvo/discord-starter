import type { SlashCommand } from "@/types/command";
import { Client, Events } from "discord.js";

export default function listenSlashCommand(client:Client):void {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        
        try {
            const slashCommand: SlashCommand | null = interaction.client.slashCommands.get(interaction.commandName);
            
            if (!slashCommand) {
                console.error(`[❌ ERROR] slashCommand not found`);
                return;
            }
            
            await slashCommand.execute(interaction);
            
        } catch (error) {
            console.error(`[❌ ERROR] ${error}`);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "There was an error",
                    ephemeral: true,
                });
            }
        }
    });
}