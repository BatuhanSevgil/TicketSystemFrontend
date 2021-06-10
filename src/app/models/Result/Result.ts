import { ResponseModel } from '../Interface/ResponseModel';

export class Result implements ResponseModel {
  success: boolean;
  message: string;
}
