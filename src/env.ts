import * as dotenv from 'dotenv';
dotenv.config();

if(!process.env.TOKEN) throw new Error("No bot token!");
export const token = process.env.TOKEN;

export const prefix = process.env.PREFIX ?? 'bs';

export const devs = [
  '163435237924143104',
];
