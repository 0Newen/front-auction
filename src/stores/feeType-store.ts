import { FeeTypeSevice } from 'src/services/FeeTypeService';
import type { FeeTypeState } from 'src/types/feeType-model';
import { defineStore } from 'pinia';

export const useFeeTypeStore = defineStore('FeeType', {
  state: (): FeeTypeState => ({
    _feeTypes: [],
  }),
  getters: {
    feeType(state) {
      return state._feeTypes;
    },
  },
  actions: {
    async fetchFeeTypes() {
      const res = await FeeTypeSevice.getAll();
      this._feeTypes = res.data.result;
    },
  },
});
