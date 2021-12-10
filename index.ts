import DiscordJS, { Intents } from 'discord.js'
import 'dotenv/config'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'

import testSchema from './test-schema'

const client = new DiscordJS.Client({
    // Discord V13 forces us to state our Intents for the bot
    // Intents are a way to tell discord what our bot intents to use and what information it needs
    // You should not subscribe to all events, only pick the ones needed
    intents:[
        Intents.FLAGS.GUILDS, //Send our bot information about GUILDS (needed for other Guild Intents)
        Intents.FLAGS.GUILD_MESSAGES 
    ]
})

client.on('ready', async () => {

    /* Standard way of connecting to a MongoDB without WOKCommands */
    // await mongoose.connect(
    //     process.env.MONGO_URI || '', 
    //     {
    //         keepAlive: true // To not close connection on idle
    //     })

    console.log('The bot is ready')
    
    new WOKCommands(client, {
        // Directory of the commands folder
        commandDir: path.join(__dirname, 'commands'),
        // Because we're running index.ts 
        typeScript: true,
        // Guilds to update commands on, remove for global
        testServers: ['760797300464943114'],
        // Connect to a MongoDB with WOKCommands
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        }
    })

    setTimeout(async () => {
        await new testSchema({
            message: 'First Entry',
        }).save()
    }, 1000);
})

client.login(process.env.TOKEN)