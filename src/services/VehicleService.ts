import { CreateVehicleParams } from 'src/types/vehicle-model';
import Api from './api';

export class VehicleService {
  static getAll() {
    return Api.get('/Vehicle');
  }

  static create(params: CreateVehicleParams) {
    return Api.post('/Vehicle', params);
  }

  static update(id: number, params: CreateVehicleParams) {
    return Api.put('/Vehicle/' + id, params);
  }

  static delete(id: number) {
    return Api.delete('/Vehicle/' + id);
  }
}
