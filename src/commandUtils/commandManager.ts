import Discord from 'discord.js';
import Context from './Context';

export const commandDefaults: CommandInfo = {
  name: 'commandname',
  aliases: [],
  execute: () => {},
  hasPermission: () => true,
  unknownCommand: () => {},
  children: [],
}

export const commandConstructor = (partial: Partial<CommandInfo>) => {
  const command = {...commandDefaults, ...partial};
  command.aliases.push(command.name);
  const call = async (ctx: Context) => {
    console.log(command.name);
    const updatedCtx = {...ctx};
    updatedCtx.managers = [call, ...updatedCtx.managers];
    if(await command.hasPermission(updatedCtx)) await command.execute(updatedCtx);
  }
  call.info = command;
  return call as Command;
}

type MaybeAsyc<T> = T | Promise<T>

export type CommandFn = (ctx: Context) => MaybeAsyc<unknown>;

export type Command = CommandFn & { info: CommandInfo };

export type CommandInfo = {
  name: string,
  aliases: string[],
  hasPermission: (ctx: Context) => MaybeAsyc<boolean>,
  execute: (ctx: Context) => MaybeAsyc<unknown>,
  unknownCommand: (ctx: Context, arg: string | undefined) => MaybeAsyc<unknown>,
  children: Command[],
};


