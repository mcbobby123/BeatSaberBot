import { commandConstructor } from '../commandUtils/commandManager';
import { MessageEmbed } from 'discord.js';
import * as api from '../apiTools/scoresaber';
import scoresaberId from '../arguments/scoresaberId';

export default commandConstructor({
  name: 'profile',
  execute: async ctx => {
    try{
      const player = await ctx.getPlayer(ctx.args[0]);
      ctx.msg.reply(
        new MessageEmbed()
          .setTitle(`${player.playerInfo.playerName}'s Profile`)
          .setThumbnail(`${api.host+player.playerInfo.avatar}`)
          .addFields([
            {
              name:'PP',
              value: player.playerInfo.pp.toLocaleString(),
              inline: true,
            },
            {
              name:'Global Rank',
              value: '#'+player.playerInfo.rank.toLocaleString(),
              inline: true,
            },
            {
              name:'Total Play Count',
              value: player.scoreStats.totalPlayCount.toLocaleString(),
              inline: true,
            },
            {
              name:'Average Ranked Acc',
              value: player.scoreStats.averageRankedAccuracy.toLocaleString()+'%',
              inline: true,
            },
          ])
      )
    }catch(e){
      ctx.error(e.result.error.message);
    }
  },
  arguments: [scoresaberId(false)]
})

;
