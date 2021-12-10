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

    /* We have 2 types of Slash commands: 
        - Guild slash commands: Registered to a specific guild, useful for development
        - Global slash commands: Regitsered to all guilds that the bot is in (Might take up to an hour to become visible to all guilds)
        So we use guild commands until we know everything is woring then we switch to global commands
    */

    // Remove the guildID to turn make commands global
    const guildID = '760797300464943114'
    const guild = client.guilds.cache.get(guildID)
    let commands // Holds the application command manager (guild or global)

    if(guild){
        commands = guild.commands
    } else{
        commands = client.application?.commands
    }

    // Registering Commands 
    commands?.create({
        name: 'ping',
        description: 'Replies with pong'
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'the first number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'the second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {

    if(!interaction.isCommand()) return

    const {commandName, options} = interaction

    if(commandName.toLowerCase() === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: true // Only the user who ran the command can see the reply
        })
    }else if (commandName.toLowerCase() === 'add'){
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')! 
        // we know these values are not null becauuse we set them as required, so we added the '!'

        /* we use deferring because by default we only have 3 seconds to reply but some calculations require more time */
        await interaction.deferReply({
            ephemeral: true
        })

        /* Because we deferred the reply we use editReply instead of Reply 
            We also added an await because the return of editReply is a Promise so we if had code after it we need to wait
        */ 
        await interaction.editReply({
            content: `The sum is ${num1 + num2}`
        })
    }

})

client.login(process.env.TOKEN)