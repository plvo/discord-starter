import "bun";

declare module "bun" {
    interface Env {
        DISCORD_TOKEN: string;
        DISCORD_CLIENT_ID: string;
        DISCORD_CLIENT_SECRET: string;
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}

// ES Module
interface Module<T> {
    [key: string]: any;
    default?: T;
}