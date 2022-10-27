console.log('Bot is starting up, please wait...')
import { GatewayIntentBits, Partials, REST } from "discord.js";
import ExtendedClient from "./structures/ExtendedClient";
import { config } from 'dotenv'
config()

export const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!)

export const client = new ExtendedClient({
	intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
	partials: [Partials.Channel, Partials.GuildMember, Partials.Message]
})