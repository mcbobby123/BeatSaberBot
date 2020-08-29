import { commandConstructor } from './commandUtils/commandManager';
import { prefix } from './env';
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
});

export default commandConstructor({
  name: 'root',
  execute: childExec,
  children: [ BotCommands ],
});