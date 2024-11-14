import { type ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import config from "@/../config.json";

export default {
    data: new SlashCommandBuilder()
        .setName('btcfees')
        .setDescription('BTC suggested fees for new transactions.'),
        
    async execute(interaction: CommandInteraction, message:any) {
        message ? console.log(`[${message.guildId}] - ${message.author.username}#${message.author.discriminator} : ${message.content}`) : console.log(`[${interaction.guild.name}] -  ${interaction.user.username}#${interaction.user.discriminator} : /${interaction.commandName}`)

        const apiMempoolFees = 'https://mempool.space/api/v1/fees/recommended'
        const response = await fetch(apiMempoolFees, { method: 'GET' })

        if (response.status === 200) {
            const data = await response.json()
            const { fastestFee, halfHourFee, hourFee, economyFee, minimumFee } = data

            const embed = new EmbedBuilder()
                .setColor(parseInt(config.embed.color as string, 16) as ColorResolvable)
                .setTitle('BTC Transaction Priority')
                .setURL('https://mempool.space/')
                .setDescription(`
                    ### 🚀 ${fastestFee} sat/vB \n
                    ### 🛵 ${halfHourFee} sat/vB \n
                    ### 🛹 ${hourFee} sat/vB \n
                    ### 🏃‍♂️ ${economyFee} sat/vB \n
                `)
                .setTimestamp()
                .setFooter(config.embed.footer)

            try {
                message ? await message.channel.send({ embeds: [embed] }) : await interaction.reply({ embeds: [embed] })
                return 
            } catch (error) {
                console.error('btcFees error\n', error)
                return null
            }
        }

        await message.channel.send('error')
        return
    }
}