import DiscordJS, { Intents } from 'discord.js'
import 'dotenv/config'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'

import testSchema from './test-schema'

const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES ,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', async () => {

    console.log('The bot is ready')
    
    new WOKCommands(client, {

        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['760797300464943114'],
        //mongoUri: process.env.MONGO_URI,
    })

})

client.login(process.env.TOKEN)