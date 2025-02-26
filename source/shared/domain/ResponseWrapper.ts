export class ResponseWrapper<IResponse> {
  constructor(public ok: boolean, public data: IResponse) { };
}
