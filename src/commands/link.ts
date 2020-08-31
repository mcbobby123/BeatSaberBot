import { commandConstructor } from '../commandUtils/commandManager';
import scoresaberId from '../arguments/scoresaberId';
import User from '../Models/User';
import { MessageEmbed } from 'discord.js';
import { host } from '../apiTools/scoresaber'

export default commandConstructor({
  name: 'link',
  execute: async ctx => {
    const player = ctx.scoresaberPlayers[ctx.args[0]]
    const doc = await User.findOneAndUpdate(
      { _id: ctx.msg.author.id },
      {
        scoresaberId: ctx.args[0],
        avatar: host+player?.playerInfo.avatar,
      },
      { new: true, upsert: true, }
    );
    ctx.userDoc = doc;
    ctx.msg.reply(
      new MessageEmbed()
        .setTitle('Success!')
        .setDescription('You have been linked')
    )
  },
  arguments: [scoresaberId(true)],
});
