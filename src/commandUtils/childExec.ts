import Context from './Context';

export default (ctx: Context) => {
  const arg = ctx.args.shift()?.toLowerCase();
  const curMgr = ctx.managers[0].info;
  if(!arg) return curMgr.unknownCommand(ctx, arg);
  const nextCmd = curMgr.children.find(c => c.info.aliases.includes(arg));
  if(!nextCmd) return curMgr.unknownCommand(ctx, arg);
  nextCmd(ctx);
}
