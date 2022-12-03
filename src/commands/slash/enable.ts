import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../structures/SlashCommand";
import {client} from "../../bot";

// Enable slash command
export default new class implements SlashCommand
{
    // By default, the command is enabled
    public enabled = true;

    // Build the slash command
    data = new SlashCommandBuilder().setName('enable')
        .setDescription('Enable slash commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('command').setDescription('Command to enabled').setRequired(true));

    async run(interaction: CommandInteraction)
    {
        const to_enable = interaction.options.get('command')?.value!;
        if (to_enable == "disable" || to_enable == "enable")
            return interaction.reply({ content: `You can't enabled the **${to_enable}** command, to do it, edit manually the files !`, ephemeral: true})
        if (to_enable == "all")
        {
            client.slash_commands.enableAll()
            interaction.reply({ content: `All slash commands enabled !`, ephemeral: true})
        }
        else if (client.slash_commands.enable(to_enable.toString()))
            interaction.reply({ content: `**${to_enable}** slash command enabled !`, ephemeral: true})
        else
            interaction.reply({ content: `**${to_enable}** slash command not found !`, ephemeral: true})
    }
}