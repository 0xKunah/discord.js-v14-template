import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import Command from "./Command";
import createCommandsHandler from '../handlers/commands'
import createEventsHandler from '../handlers/events'

export default class extends Client
{
	// Create a collection that will store bot commands
	public commands = new Collection<string, Command>();
	constructor(props: {intents: GatewayIntentBits[], partials: Partials[]})
	{
		super(props)
		// Create commands and events handlers
		createCommandsHandler();
		createEventsHandler();
	}
}