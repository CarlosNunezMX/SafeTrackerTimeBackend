import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type IContactRepository from "../domain/IContactRepository";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type Contact from "../domain/contact";
import CatchResponseError from "../../shared/infrastructure/catchError";

export default class GetContactsService implements IService<Contact[], string> {
  constructor(
    private contactRepo: IContactRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service(args: string): Promise<IServiceResponse<string> | IServiceResponse<Contact[]>> {
    try {
      const contacts = await this.contactRepo.getByUserID(args);
      return {
        code: 200,
        res: new this.responseWrapper(true, contacts)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
};
