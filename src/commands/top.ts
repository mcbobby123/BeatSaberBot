import { commandConstructor } from '../commandUtils/commandManager';
import { MessageEmbed } from 'discord.js';
import * as api from '../apiTools/scoresaber';

export default commandConstructor({
  name: 'top',
  execute: async ctx => {
    const id = ctx.args[0];
    if(!id) ctx.msg.reply('include user id');
    try{
      const { scores } = await api.getScores(id, 'top', 0);
      ctx.msg.reply(
        new MessageEmbed()
          .setTitle('Top Plays')
          .addFields(scores.map(s => ({name: `${s.songName}`, value: `${s.pp}pp`, inline: true})))
      )
    } catch (e) {
      ctx.error(e.result.error.message)
    }
  }
});
