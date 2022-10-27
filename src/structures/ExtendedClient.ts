import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import Command from "./Command";
import SlashCommand from "./SlashCommand";
import createCommandsHandler from '../handlers/commands'
import { refreshSlashCommands, registerSlashCommands } from '../handlers/slash_commands'
import createEventsHandler from '../handlers/events'

export default class extends Client
{
	// Create a collection that will store bot commands
	public commands = new Collection<string, Command>();
	public slash_commands = new Collection<string, SlashCommand>();

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