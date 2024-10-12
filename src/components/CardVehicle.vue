<script lang="ts" setup>
import { useAppStore } from 'src/stores/app-store';
import { useVehicleTypeStore } from 'src/stores/vehicleType-store';
import type { CreateVehicleParams } from 'src/types/vehicle-model';
import type { VehicleType } from 'src/types/vehicleType-model';
import { computed, onMounted, ref, watch, type Ref, type PropType } from 'vue';

defineOptions({
  name: 'CardVehicle',
});
const appStore = useAppStore();
const vehicleTypeStore = useVehicleTypeStore();

const emit = defineEmits<{
  (e: 'vehicleAdded', data: CreateVehicleParams): void;
  (e: 'vehicleEdited', data: CreateVehicleParams): void;
}>();

const props = defineProps({
  vehicle: { type: Object as PropType<CreateVehicleParams> },
});

const vehicleTypes = computed(() =>
  vehicleTypeStore.vehicleTypes.map((el: VehicleType) => ({
    label: el.name,
    value: el.id,
  }))
);

const vehiclePrice: Ref<number | null> = ref(null);
const vehicleTypeId: Ref<number | null> = ref(null);

// Validate if both fields are filled
const isFormValid = computed(
  () => vehiclePrice.value !== null && vehicleTypeId.value !== null
);

watch(props, (newValue) => {
  if (newValue.vehicle) {
    vehiclePrice.value = newValue.vehicle.price;
    vehicleTypeId.value = newValue.vehicle.typeId;
  } else {
    cleanReferences();
  }
});

const cleanReferences = () => {
  vehiclePrice.value = null;
  vehicleTypeId.value = null;
};

const onSubmit = () => {
  if (props.vehicle) {
    emit('vehicleEdited', {
      price: vehiclePrice.value!,
      typeId: vehicleTypeId.value!,
    });
  } else {
    emit('vehicleAdded', {
      price: vehiclePrice.value!,
      typeId: vehicleTypeId.value!,
    });
  }
  cleanReferences();
};

onMounted(async () => {
  try {
    appStore.setLoading(true);
    vehicleTypeStore.fetchVehicleTypes();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
  }
});
</script>

<template>
  <q-card>
    <q-form @submit="onSubmit" style="padding: 2em 3em" class="q-gutter-md">
      <q-card-section>
        <h4>Create Vehicle</h4>
        <!-- Single row with input, select, and button -->
        <q-row class="q-col-gutter-md items-center">
          <!-- Price Input -->
          <q-input
            outlined
            clearable
            type="number"
            maxlength="10"
            v-model="vehiclePrice"
            label="Price *"
          />
          <q-select
            class="filter-date-outlined"
            outlined
            emit-value
            map-options
            v-model="vehicleTypeId"
            :options="vehicleTypes"
            label="Type *"
          />
          <q-col cols="4" class="flex flex-center">
            <q-btn
              color="positive"
              label="Send"
              type="submit"
              :disable="!isFormValid"
            />
          </q-col>
        </q-row>
      </q-card-section>
    </q-form>
  </q-card>
</template>
