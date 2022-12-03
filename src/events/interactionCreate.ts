import { Interaction } from "discord.js";
import Event from "structures/Event";
import { client } from "../bot";

export default new class implements Event
{
	// There will be more than one interaction
	// That's why once is set to false here
	public once = false;

	public run(interaction: Interaction)
	{
		// Check if interaction is a slash command
		if(interaction.isChatInputCommand())
		{
			// Prevents bots to run commands
			if(interaction.user.bot) return

			// Check if bot has this command
			if(client.slash_commands.has(interaction.commandName))
			{
				// Check if command is enabled
				if (client.slash_commands.get(interaction.commandName)!.enabled)
					// Get and run the command
					client.slash_commands.get(interaction.commandName)!.run(interaction);
				else
					interaction.reply({ content: `This command is disabled !`, ephemeral: true });

			} else return interaction.reply({ content: `Command not found` })
		}

	}
}