"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
// Give us access to the variables inside the .env file as environment variables
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    // Discord V13 forces us to state our Intents for the bot
    // Intents are a way to tell discord what our bot intents to use and what information it needs
    // You should not subscribe to all events, only pick the ones needed
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', () => {
    var _a;
    console.log('The bot is ready');
    /* We have 2 types of Slash commands:
        - Guild slash commands: Registered to a specific guild, useful for development
        - Global slash commands: Regitsered to all guilds that the bot is in (Might take up to an hour to become visible to all guilds)
        So we use guild commands until we know everything is woring then we switch to global commands
    */
    // Remove the guildID to turn make commands global
    const guildID = '760797300464943114';
    const guild = client.guilds.cache.get(guildID);
    let commands; // Holds the application command manager (guild or global)
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
    }
    // Registering Commands 
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: 'ping',
        description: 'Replies with pong'
    });
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'the first number',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'the second number',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    });
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    if (commandName.toLowerCase() === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true // Only the user who ran the command can see the reply
        });
    }
    else if (commandName.toLowerCase() === 'add') {
        const num1 = options.getNumber('num1');
        const num2 = options.getNumber('num2');
        // we know these values are not null becauuse we set them as required, so we added the '!'
        /* we use deferring because by default we only have 3 seconds to reply but some calculations require more time */
        yield interaction.deferReply({
            ephemeral: true
        });
        /* Because we deferred the reply we use editReply instead of Reply
            We also added an await because the return of editReply is a Promise so we if had code after it we need to wait
        */
        yield interaction.editReply({
            content: `The sum is ${num1 + num2}`
        });
    }
}));
client.login(process.env.TOKEN);
