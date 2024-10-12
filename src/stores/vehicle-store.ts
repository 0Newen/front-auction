import { VehicleService } from 'src/services/VehicleService';
import type {
  CreateVehicleParams,
  VehicleState,
} from 'src/types/vehicle-model';
import { defineStore } from 'pinia';

export const useVehicleStore = defineStore('Vehicle', {
  state: (): VehicleState => ({
    _vehicles: [],
  }),
  getters: {
    vehicle(state) {
      return state._vehicles;
    },
  },
  actions: {
    async fetchVehicles() {
      const res = await VehicleService.getAll();
      this._vehicles = res.data.result;
    },
    async createVehicle(params: CreateVehicleParams) {
      const res = await VehicleService.create(params);
      this._vehicles.push(res.data.result);
    },
    async updateVehicle(id: number, params: CreateVehicleParams) {
      const res = await VehicleService.update(id, params);
      this._vehicles[this.vehicle.findIndex((el) => el.id == id)] =
        res.data.result;
    },
    async deleteVehicle(id: number) {
      const res = await VehicleService.delete(id);
      if (res) {
        this._vehicles = this._vehicles.filter((el) => el.id != id);
      }
    },
  },
});
