import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../structures/SlashCommand";
import {client} from "../../bot";

// Disable slash command
export default new class implements SlashCommand
{
    // By default, the command is enabled
    public enabled = true;

    // Build the slash command
    data = new SlashCommandBuilder().setName('disable')
        .setDescription('Disable slash commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('command').setDescription('Command to disable').setRequired(true));

    async run(interaction: CommandInteraction)
    {
        const to_disable = interaction.options.get('command')?.value!;
        if (to_disable == "disable" || to_disable == "enable")
            return interaction.reply({ content: `You can't disable the **${to_disable}** command, to do it, edit manually the files !`, ephemeral: true})
        if (to_disable == "all")
        {
            client.slash_commands.disableAll()
            interaction.reply({ content: `All slash commands disabled !`, ephemeral: true})
        }
        else if (client.slash_commands.disable(to_disable.toString()))
            interaction.reply({ content: `**${to_disable}** slash command disabled !`, ephemeral: true})
        else
            interaction.reply({ content: `**${to_disable}** slash command not found !`, ephemeral: true})
    }
}
