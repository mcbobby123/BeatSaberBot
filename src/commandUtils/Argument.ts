import Context from './Context';
import { MaybeAsyc } from '../utilityTypes';
import { EmbedFieldData } from 'discord.js';

export type ArgumentValidation = {success:true, value?: string} | {success:false,reason:string,description:string};
export type ArgumentValidator = (arg: string, ctx: Context) => MaybeAsyc<ArgumentValidation>;

export type ArgumentOptions = {
  name: string,
  description: string,
  required?: boolean,
  validator?: ArgumentValidator,
}

export default class Argument{
  name: string;
  description: string;
  required: boolean;
  validator: ArgumentValidator;

  constructor(options: ArgumentOptions){
    this.name = options.name;
    this.description = options.description;
    this.required = options.required ?? true;
    this.validator = options.validator ?? (() => ({success:true}));
  }

  async validate(arg: string, ctx: Context): Promise<ArgumentValidation> {
    if(!arg && this.required) return {success: false, reason:'Missing Argument', description:`${this.name} is Missing`}
    const result = await this.validator(arg, ctx);
    return result;
  }

  generateDescriptionEmbedField(inline?: boolean): EmbedFieldData {
    return { name: this.name, value: this.description, inline }
  }
}
