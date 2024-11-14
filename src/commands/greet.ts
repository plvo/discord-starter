import type { Command } from "@/types/command";

const command : Command = {
    name: "greet",
    execute: (message, args) => {
        let toGreet = message.mentions.members?.first();
        message.channel.send(`Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`)
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator"]
};

export default command