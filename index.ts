import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
// Give us access to the variables inside the .env file as environment variables
dotenv.config()

const client = new DiscordJS.Client({
    // Discord V13 forces us to state our Intents for the bot
    // Intents are a way to tell discord what our bot intents to use and what information it needs
    // You should not subscribe to all events, only pick the ones needed
    intents:[
        Intents.FLAGS.GUILDS, //Send our bot information about GUILDS (needed for other Guild Intents)
        Intents.FLAGS.GUILD_MESSAGES 
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase() === 'ping'){
        message.reply({
            content: 'pong'
        })
    }
})

client.login(process.env.TOKEN)