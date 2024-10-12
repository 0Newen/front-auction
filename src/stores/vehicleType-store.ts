import { VehicleTypeService } from 'src/services/VehicleTypeService';
import type { VehicleTypeState } from 'src/types/vehicleType-model';
import { defineStore } from 'pinia';

export const useVehicleTypeStore = defineStore('VehicleType', {
  state: (): VehicleTypeState => ({
    _vehicleTypes: [],
  }),
  getters: {
    vehicleTypes(state) {
      return state._vehicleTypes;
    },
  },
  actions: {
    async fetchVehicleTypes() {
      const res = await VehicleTypeService.getAll();
      this._vehicleTypes = res.data.result;
    },
  },
});
