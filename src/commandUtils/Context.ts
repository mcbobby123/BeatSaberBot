import { Message } from "discord.js";
import { Command } from './commandManager';
import root from '../rootCommand';

export default class{
  args: string[];
  managers: Command[];

  constructor(public msg: Message){
    this.args = msg.content.split(/\s+/);
    this.managers = [root]
  }
}
