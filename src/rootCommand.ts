import { commandConstructor } from './commandUtils/commandManager';
import { prefix } from './env';
import childExec from './commandUtils/childExec';

import ping from './commands/ping';

const BotCommands = commandConstructor({
  name: prefix,
  execute: childExec,
  children: [
    ping,
  ],
});

export default commandConstructor({
  name: 'root',
  execute: childExec,
  children: [ BotCommands ],
});