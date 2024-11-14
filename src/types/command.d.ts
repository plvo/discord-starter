import type { CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder } from "discord.js";

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

export interface SlashCommand {
    data: SlashCommandBuilder,
    execute: (CommandInteraction: CommandInteraction) => any
}

export interface CommandList {
    name: string,
    path: string,
};