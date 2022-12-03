import { Client, GatewayIntentBits, Partials } from "discord.js";
import createCommandsHandler from '../handlers/commands'
import { refreshSlashCommands } from '../handlers/slash_commands'
import createEventsHandler from '../handlers/events'
import Commands from "./Commands";
import SlashCommands from "./SlashCommands";

export default class extends Client
{
	// Create a collection that will store bot commands
	public commands = new Commands();
	public slash_commands = new SlashCommands();

	constructor(props: {intents: GatewayIntentBits[], partials: Partials[]})
	{
		super(props)

		// Login using the given token
		this.login(process.env.TOKEN).then(() => {

			// Create commands and events handlers
			refreshSlashCommands();
			createCommandsHandler();
			createEventsHandler();
			
		});
	}
}