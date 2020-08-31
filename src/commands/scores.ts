import { commandConstructor } from '../commandUtils/commandManager';
import { MessageEmbed } from 'discord.js';
import * as api from '../apiTools/scoresaber';
import scoresaberId from '../arguments/scoresaberId';
import childExec from '../commandUtils/childExec';

export default commandConstructor({
  name: 'scores',
  execute: childExec,
  children: (['top','recent'] as const).map(order => commandConstructor({
    name: order,
    execute: async ctx => {
      try{
        const { scores } = await api.getScores(ctx.args[0], order, 0);
        ctx.msg.reply(
          new MessageEmbed()
            .setTitle('Top Plays')
            .addFields(
              scores.map(s => ({
                name: `${s.songAuthorName} - ${s.songName} [${api.difficulties[s.difficulty] || s.difficultyRaw}] ${s.mods || ''}`, 
                value: `${s.pp}pp (${s.maxScore ? Math.round(10000*s.score/s.maxScore)/100+'%' : s.score.toLocaleString()+' score'})`
              }))
            )
            .setThumbnail(api.getAvatarURL(ctx.args[0]))
        )
      }catch(e){
        ctx.error(e.result.error.message);
      }
    },
    arguments: [scoresaberId(false)]
  }))
})

;
