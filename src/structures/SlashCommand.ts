import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface SlashCommand
{
	run: (interaction: CommandInteraction) => void;
	data:  Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
	enabled: boolean;
}