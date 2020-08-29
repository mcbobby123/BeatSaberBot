import { commandConstructor } from '../commandUtils/commandManager';

export default commandConstructor({
  name: 'ping',
  execute: ctx => ctx.msg.reply('pong')
});
