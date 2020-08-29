import { Message } from "discord.js";
import { Command } from './commandManager';
import root from '../rootCommand';

export default class Context{
  msg: Message;
  args: string[];
  managers: Command[];

  constructor(arg1: Message);
  constructor(arg1: Context, arg2: Command);
  constructor(arg1: Message | Context, arg2?: Command){
    if(arg1 instanceof Context){
      this.msg = arg1.msg;
      this.managers = [arg2 as Command, ...arg1.managers];
      this.args = arg1.args;
    } else {
      this.msg = arg1;
      this.args = arg1.content.split(/\s+/);
      this.managers = [root];
    }
  }
}
