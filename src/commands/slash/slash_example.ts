import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../structures/SlashCommand";

export default new class implements SlashCommand
{
	// By default, the command is enabled
	public enabled = true;

	// Build the slash command
	data = new SlashCommandBuilder().setName('slash_example').setDescription('Slash command example').setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

	async run(interaction: CommandInteraction)
	{
		await interaction.reply({content: "Slash example works !"})
	}
}