export class Vechicles {
  StoreId: string;
  type: VehicleTYpe;
  id: string;
  kmDriven: number;
  dailyRentalCost: number;
  hourlyRentalCost: number;
  companyName: string;
  modelName: string;
  noOfSeat: number;
}

export enum VehicleTYpe {
  bike = 'Bike',
  car = 'Car',
  truck = 'Truck',
}

export enum Status {
  active,
  inactive,
}
