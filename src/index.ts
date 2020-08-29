import Discord from 'discord.js';
import { token } from './env';
import root from './rootCommand';
import Context from './commandUtils/Context';

const client = new Discord.Client();

client.on('message', msg => {
  if(msg.author.bot) return;
  root(new Context(msg));
});

client.on('ready', () => console.log(`Connected as ${client.user?.username}#${client.user?.discriminator}`))

client.login(token);
