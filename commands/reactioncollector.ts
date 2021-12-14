import { Message, MessageReaction, MessageType, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {

    category: 'Testing',
    description: 'Testing Message & Reaction Collectors',

    callback: ({message, channel}) => {
        message.reply('Please React:')
        message.react('👍')

        const filter = (reaction: MessageReaction, user: User) => { 
            return user.id === message.author.id
        }

        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 5
        })

        collector.on('collect', (reaction) => {
            console.log(reaction)
        })

        collector.on('end', (collected) => {
            if (collected.size === 0) {
                message.reply('You did not react.')
                return 
            }

            let text = 'Collected:\n\n'

            collected.forEach((message) => {
                text += `${message.emoji.name}\n`
            })

            message.reply(text)
        })

    }

} as ICommand