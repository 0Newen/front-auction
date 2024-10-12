<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import type { CreateVehicleParams } from 'src/types/vehicle-model';
import type { Vehicle } from 'src/types/vehicle-model';
import { useAppStore } from 'src/stores/app-store';
import { useVehicleStore } from 'src/stores/vehicle-store';
import { CardVehicle, TableVehicles } from 'src/components';

defineOptions({
  name: 'IndexPage',
});

const appStore = useAppStore();
const vehicleStore = useVehicleStore();

const showDialog: Ref<boolean> = ref(false);
const vehicle: Ref<Vehicle | null> = ref(null);

const handleAddVehicle = () => {
  showDialog.value = true;
};

const closeDialogVehicle = () => {
  vehicle.value = null;
  showDialog.value = false;
};

const addVehicle = async (val: CreateVehicleParams) => {
  try {
    appStore.setLoading(true);
    await vehicleStore.createVehicle(val);
    appStore.showNotification('Vehicle created', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
    closeDialogVehicle();
  }
};

const editVehicle = async (val: CreateVehicleParams) => {
  try {
    appStore.setLoading(true);
    await vehicleStore.updateVehicle(vehicle.value?.id as number, val);
    appStore.showNotification('Vehicle edited', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
    closeDialogVehicle();
  }
};

const deleteVehicle = async (val: number) => {
  try {
    appStore.setLoading(true);
    await vehicleStore.deleteVehicle(val);
    appStore.showNotification('Vehicle deleted', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
    closeDialogVehicle();
  }
};
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card style="min-width: 900px">
      <CardVehicle
        :show-dialog="showDialog"
        :vehicle="vehicle!"
        @vehicle-added="($event:any)=>addVehicle($event)"
        @vehicle-edited="($event:any)=>editVehicle($event)"
        @close="closeDialogVehicle"
      ></CardVehicle>
      <TableVehicles
        @edit-vehicle="handleAddVehicle"
        @delete-vehicle="deleteVehicle"
      ></TableVehicles>
    </q-card>
  </q-page>
</template>
