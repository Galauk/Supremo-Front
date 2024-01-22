
export class Endpoints{
  constructor(
    public id?:any | null,
    public method?: string,
    public url?: string,
    public header?: Array<string>,
    public body?: Array<string>,
    public options?: Array<string>,
    public datasetId?: number,
    public order?: number,
    public executedAt?: string,
    public toAuthenticate?: boolean,
    public isActive?: boolean
    ){

  }
}
