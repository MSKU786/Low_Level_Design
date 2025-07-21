import { VehicleRentalSystem } from './VehicleRentalSystem';
import { Location } from './Location';
import { VehicleTYpe } from './Vehicles';
import { Bill } from './Bill';
import { Payment } from './Payment';

console.log('--- Vehicle Rental System Demo ---');

// 1. Initialize the system
const rentalSystem = new VehicleRentalSystem();
console.log('System initialized.');

// 2. Create a user
const user = rentalSystem.createUser('Alice Smith', 'DL987654321');
console.log('User created:', user);

// 3. Create a location
const location = new Location();
location.country = 'India';
location.state = 'Karnataka';
location.city = 'Bangalore';
location.address = '456 MG Road';
location.pincode = 560001;
console.log('Location created:', location);

// 4. Create a store
const store = rentalSystem.createStore(
  'Bangalore Central',
  location,
  '+91-9000000000',
  'Owner 2'
);
console.log('Store created:', store);

// 5. Add vehicles to the store
const vehicle1 = rentalSystem.createVehicle(
  store.id,
  VehicleTYpe.car,
  'Toyota',
  'Corolla',
  5,
  2500,
  250
);
const vehicle2 = rentalSystem.createVehicle(
  store.id,
  VehicleTYpe.bike,
  'Bajaj',
  'Pulsar',
  2,
  500,
  50
);
console.log('Vehicles added:', vehicle1, vehicle2);

// 6. List all available vehicles
console.log('Available vehicles:', rentalSystem.getAvailableVehicles());

// 7. Make a reservation
const reservation = rentalSystem.createReservation(
  user.id,
  vehicle1.id,
  new Date('2024-07-01'),
  new Date('2024-07-05'),
  location,
  location
);
console.log('Reservation made:', reservation);

// 8. Generate a bill for the reservation
if (reservation) {
  const bill = new Bill(reservation);
  console.log('Bill generated:', bill);

  // 9. Pay the bill
  const payment = new Payment();
  payment.paybill(bill);
  console.log('Bill after payment:', bill);
}

// 10. Search vehicles by type
console.log('All cars:', rentalSystem.getVehiclesByType(VehicleTYpe.car));
console.log('All bikes:', rentalSystem.getVehiclesByType(VehicleTYpe.bike));

// 11. Get reservations by user
console.log(
  'Reservations for user:',
  rentalSystem.getReservationsByUser(user.id)
);

// 12. Update user info
rentalSystem.updateUser(user.id, 'Alice Johnson');
console.log('User after update:', rentalSystem.getUserById(user.id));

// 13. Delete a vehicle
rentalSystem.deleteVehicle(vehicle2.id);
console.log('Vehicles after deletion:', rentalSystem.getAllVehicles());

// 14. Delete user
rentalSystem.deleteUser(user.id);
console.log('Users after deletion:', rentalSystem.getAllUsers());

console.log('--- Demo Complete ---');
