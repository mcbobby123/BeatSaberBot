import { commandConstructor } from './commandUtils/commandManager';
import { prefix, devs } from './env';
import childExec from './commandUtils/childExec';
import ping from './commands/ping';
import scores from './commands/scores';
import link from './commands/link';
import profile from './commands/profile';

const BotCommands = commandConstructor({
  name: prefix,
  execute: childExec,
  children: [
    ping,
    scores,
    link,
    profile,
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