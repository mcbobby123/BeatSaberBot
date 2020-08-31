import Argument from '../commandUtils/Argument';
import * as scoresaber from '../apiTools/scoresaber';
import User from '../Models/User';

const arg = (required: boolean) => new Argument({
  name: 'User ID',
  description: 'Probably their SteamID',
  validator: async (arg, ctx) => {
    if(!arg) {
      const doc = await ctx.getUser(ctx.msg.author.id);
      if(doc?.scoresaberId) return {success:true,value:doc?.scoresaberId};
      return {success:false,reason:'Missing Arguement',description:'If you do not have a scoresaber account linked, you must include a user ID'}
    }
    try{
      await ctx.getPlayer(arg)
      return {success:true,value:arg};
    } catch (e) {
      return {success:false,reason:'Not Found',description:`Couldn't find ${arg}'s score saber profile`}
    }
  },
  required,
});

export default arg;
