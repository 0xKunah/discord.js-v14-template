import SlashCommand from "./SlashCommand";
import { Collection } from "discord.js";

// This class will store all slash commands
// With custom methods to enable/disable slash commands
export default class SlashCommands {
    public collection: Collection<string, SlashCommand>;
    constructor() {
        this.collection = new Collection();
    }
    public add(name: string, command: SlashCommand) {
        this.collection.set(name, command);
    }

    public get(name: string) {
        return this.collection.get(name);
    }

    public has(name: string) {
        return this.collection.has(name);
    }

    public delete(name: string) {
        return this.collection.delete(name);
    }

    public disable(name: string): boolean {
        const slash = this.get(name);
        if (!slash)
            return (false);
        slash.enabled = false;
        return (true);
    }

    public enable(name: string): boolean {
        const slash = this.get(name);
        if (!slash)
            return (false);
        slash.enabled = true;
        return (true);
    }

    public enableAll() {
        this.collection.forEach((slash) => {
            slash.enabled = true;
        });
    }

    public disableAll() {
        this.collection.forEach((slash) => {
            slash.enabled = false;
        });
    }

    public clear() {
        return this.collection.clear();
    }

    public size() {
        return this.collection.size;
    }

    public map(callback: (value: SlashCommand, key: string, collection: Collection<string, SlashCommand>) => any) {
        return this.collection.map(callback);
    }
}