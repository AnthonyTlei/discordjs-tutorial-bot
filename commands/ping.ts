import { ICommand } from "wokcommands";

export default {

    category: 'testing',
    description: 'Replies with pong',
    slash: 'both', // For Slash and Legacy commands
    testOnly: true, // For guild specific commands (not global)

    /* message is used for legacy commands while interaction is for Slash commands 
        interaction will be null if the user used legacy commands
        message will be null if the user used slash commands
    */
    callback: ({message, interaction}) => {
        
        /* WOKCommands will handle checking if its a legacy or slash command */
        // if(message){
        //     message.reply('pong')
        // }

        // if(interaction){
        //     interaction.reply('pong')
        // }

        return 'Pong'

    }

} as ICommand