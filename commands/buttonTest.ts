import { Interaction, MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    category: 'testing',
    description: 'Returns a Button',
    slash: true,
    testOnly: true,

    callback: async ({interaction:msgInt,channel}) =>{
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('exampleID')
            .setEmoji('🤞')
            .setLabel('Label1')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('example2ID')
            .setEmoji('👍')
            .setLabel('Label2')
            .setStyle('DANGER')
        )

        // Specific conditions are required for a link button, you cannot set an ID, and style must be LINK
        const linkRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setURL('https://youtube.com')
            .setLabel('YOUTUBE')
            .setStyle('LINK')
        )

        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkRow],
            ephemeral: true
        })

        // making suree that only the person that interacted with thee bot can answeer the button (in case ephemeral was off)
        const filter = (interaction: Interaction) => {
            return msgInt.user.id === interaction.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        collector.on('collect', (i: MessageComponentInteraction) => {
            i.reply({
                content: 'you clicked a button',
                ephemeral: true
            })
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            await msgInt.editReply({
                content: 'An action has already been taken',
                components: []
            })

        })

    },


} as ICommand