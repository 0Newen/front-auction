export interface VehicleState {
  _vehicles: Vehicle[];
}

export interface CreateVehicleParams {
  price: number;
  typeId: number;
}

export interface Vehicle {
  id: number;
  price: number;
  typeId: number;
  typeName: string;
  basicFee: number;
  specialFee: number;
  associationFee: number;
  storageFee: number;
  totalFee: number;
}
