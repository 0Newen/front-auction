<script setup lang="ts">
import { useAppStore } from 'src/stores/app-store';
import { useVehicleStore } from 'src/stores/vehicle-store';
import { Vehicle } from 'src/types/vehicle-model';
import { computed, onMounted, ref } from 'vue';
import { useQuasar, type QTableProps } from 'quasar';
import { formatCurrency } from 'src/util/formatters';

const $q = useQuasar();

defineOptions({
  name: 'TableVehicle',
});

const appStore = useAppStore();
const vehicleStore = useVehicleStore();

const emit = defineEmits<{
  (e: 'editVehicle', data: Vehicle): void;
  (e: 'deleteVehicle', data: number): void;
}>();

const vehicles = computed(() => vehicleStore.vehicle);

const loadingSkeleton = ref(false);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const columns: QTableProps['columns'] = ref([
  {
    name: 'price',
    required: true,
    label: 'Price ($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.price),
    sortable: false,
  },
  {
    name: 'typeName',
    required: true,
    label: 'Type',
    align: 'center',
    field: (row: Vehicle) => row.typeName,
    sortable: false,
  },
  {
    name: 'basicFee',
    required: true,
    label: 'Basic Fee ($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.basicFee),
    sortable: false,
  },
  {
    name: 'specialFee',
    required: true,
    label: 'Special Fee ($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.specialFee),
    sortable: false,
  },
  {
    name: 'associationFee',
    required: true,
    label: 'Association Fee ($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.associationFee),
    sortable: false,
  },
  {
    name: 'storageFee',
    required: true,
    label: 'Storage Fee ($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.storageFee),
    sortable: false,
  },
  {
    name: 'totalFee',
    required: true,
    label: 'Total($)',
    align: 'center',
    field: (row: Vehicle) => formatCurrency(row.totalFee),
    sortable: false,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'actions',
  },
]);
onMounted(async () => {
  try {
    loadingSkeleton.value = true;
    await vehicleStore.fetchVehicles();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    loadingSkeleton.value = false;
  }
});
const hadleVehicleDeletion = (val: Vehicle) => {
  $q.dialog({
    title: 'Delete this item?',
    message:
      'Do you really want to delete this item? This action cannot be undone.',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    emit('deleteVehicle', val.id);
  });
};
</script>

<template>
  <q-card>
    <q-table
      table-header-class="bg-primary text-white"
      separator="cell"
      :rows="vehicles"
      :columns="columns"
      row-key="id"
      v-if="!loadingSkeleton"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            flat
            round
            color="primary"
            @click="emit('editVehicle', props.row)"
          />
          <q-btn
            icon="delete"
            flat
            round
            color="primary"
            @click="hadleVehicleDeletion(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <SkeletonTable v-else />
  </q-card>
</template>
