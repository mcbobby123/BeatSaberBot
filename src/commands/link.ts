import { commandConstructor } from '../commandUtils/commandManager';
import scoresaberId from '../arguments/scoresaberId';
import User from '../Models/User';
import { MessageEmbed } from 'discord.js';

export default commandConstructor({
  name: 'link',
  execute: async ctx => {
    const doc = await User.findOneAndUpdate(
      { _id: ctx.msg.author.id },
      { scoresaberId: ctx.args[0], },
      { new: true, upsert: true, }
    );
    ctx.msg.reply(
      new MessageEmbed()
        .setTitle('Success!')
        .setDescription('You have been linked')
    )
  },
  arguments: [scoresaberId(true)],
});
