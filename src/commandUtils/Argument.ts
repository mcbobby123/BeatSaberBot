import Context from './Context';

export type ArgumentValidator = (arg: string, ctx: Context) => boolean;

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
    this.required = options.required ?? false;
    this.validator = options.validator ?? (() => true);
  }
}
