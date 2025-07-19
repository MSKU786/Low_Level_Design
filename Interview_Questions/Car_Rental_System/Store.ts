import { Location } from './Location';
import { VehicleInventoryManager } from './VehiceleInventoryManager';

export class Store {
  id: string;
  location: Location;
  name: string;
  phoneNumber: string;
  owner: string;
  vehicleInventoryManager: VehicleInventoryManager;
  reservation: [];
}
