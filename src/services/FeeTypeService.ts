import Api from './api';

export class FeeTypeSevice {
  static getAll() {
    return Api.get('/FeeType');
  }
}
