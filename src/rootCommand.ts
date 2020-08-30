import { commandConstructor } from './commandUtils/commandManager';
import { prefix, devs } from './env';
import childExec from './commandUtils/childExec';
import ping from './commands/ping';
import top from './commands/top';

const BotCommands = commandConstructor({
  name: prefix,
  execute: childExec,
  children: [
    ping,
    top,
  ],
  hasPermission: (ctx)=>{
    return devs.includes(ctx.msg.author.id)
  }
});

export default commandConstructor({
  name: 'root',
  execute: childExec,
  children: [ BotCommands ],
});