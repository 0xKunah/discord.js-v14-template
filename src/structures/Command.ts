import { Message } from "discord.js";

export default interface Command
{
	run: (msg: Message, args: string[]) => void;
	permissions: bigint
}