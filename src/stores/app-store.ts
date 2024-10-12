import type { AppState } from 'src/types/app-model';
import { defineStore } from 'pinia';
import type { QNotifyCreateOptions } from 'quasar';

export const useAppStore = defineStore('App', {
  state: (): AppState => ({
    _notify: {
      message: '',
      type: '',
      timeout: 0,
      position: 'top-right',
    },
    _isLoading: false,
  }),
  getters: {
    appState(state) {
      return state._notify;
    },
    isLoading(state) {
      return state._isLoading;
    },
  },
  actions: {
    showNotification(
      message: string,
      type: string,
      timeout: number = 4000,
      position: QNotifyCreateOptions['position'] = 'top-right'
    ) {
      this._notify = {
        message,
        type,
        timeout,
        position,
      };
    },
    setLoading(show: boolean) {
      this._isLoading = show;
    },
  },
});
