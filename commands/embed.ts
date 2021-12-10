import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

// The following only works for legacy commands
export default {
    category: 'testing',
    description: 'Sends an embed',
    permissions: ['ADMINISTRATOR'],

    callback: ({message, text}) =>{

        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

    //     const embed = new MessageEmbed()
    //     .setDescription('Hello World')
    //     .setTitle('Title')
    //     .setColor('RED')
    //     .setAuthor('Anthony')
    //     .setFooter('Footer')
    //     .addFields([{
    //         name: 'name',
    //         value: 'value'
    //     },
    //     {
    //         name: 'name2',
    //         value: 'value2'
    //     }
    // ])
        
        // Because we're using WOKCommands we can simply return the embed 
        return embed
    }

} as ICommand