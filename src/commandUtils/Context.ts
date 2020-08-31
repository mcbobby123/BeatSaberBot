import { Message, MessageEmbed } from "discord.js";
import { Command } from './commandManager';
import { IUser } from "../Models/User";

export default class Context{
  msg: Message;
  args: string[];
  managers: Command[];
  target?: IUser;

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
      this.managers = [];
    }
  }
  
  async validate(){
    const cmdArgs = this.activeCommand.info.arguments;
    for(let i = 0; i < cmdArgs.length; i++){
      const result = await cmdArgs[i].validate(this.args[i], this);
      if(!result.success){
        this.msg.reply(
          new MessageEmbed()
            .setTitle(`${result.reason}`)
            .setDescription(`${result.description}\n\nExample Usage: ${this.generateCommandExample()}`)
            .addFields(this.generateCommandArgUsageFields())
            .setThumbnail('https://statsify.net/img/assets/error.gif')
        )
        return false;
      } else if(result.value) this.args[i] = result.value;
    }
    return true;
  }

  error(explaination: string){
    this.msg.reply(
      new MessageEmbed()
        .setTitle('An Error Occured')
        .setDescription(explaination)
        .setThumbnail('https://statsify.net/img/assets/error.gif')
    )
  }

  get activeCommand(){
    return this.managers[0];
  }

  generateCommandExample(){
    return '`'+this.managers.slice(0,-1).reverse().map(c => c.info.name).join(' ') + ' ' + this.activeCommand.info.arguments.map(arg => `[${arg.name}]`)+'`';
  }

  generateCommandArgUsageFields(){
    return this.activeCommand.info.arguments.map(arg => arg.generateDescriptionEmbedField());
  }

  printUsage(){
    this.msg.reply(
      new MessageEmbed()
        .setTitle(`${this.activeCommand.info.name} Usage`)
        .setDescription(this.generateCommandExample())
        .addFields(this.generateCommandArgUsageFields())
    )
  }
}
