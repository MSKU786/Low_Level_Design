import { ParkingLot } from './ParkingLot';
import { Vehicle, VehicleType } from './Vehicle';

// Demo function to test the parking lot system
function runParkingLotDemo() {
  console.log('🚗 Starting Parking Lot System Demo 🚗\n');

  // Initialize parking lot
  const parkingLot = new ParkingLot();

  // Show initial status
  parkingLot.getParkingStatus();

  // Create some vehicles
  const bike1 = new Vehicle('BIKE001', VehicleType.TWO_WHEELER);
  const bike2 = new Vehicle('BIKE002', VehicleType.TWO_WHEELER);
  const car1 = new Vehicle('CAR001', VehicleType.FOUR_WHEELER);
  const car2 = new Vehicle('CAR002', VehicleType.FOUR_WHEELER);
  const car3 = new Vehicle('CAR003', VehicleType.FOUR_WHEELER);

  console.log('=== VEHICLE ENTRY PROCESS ===');

  // Vehicle entry
  const ticket1 = parkingLot.vehicleEntry(bike1);
  const ticket2 = parkingLot.vehicleEntry(bike2);
  const ticket3 = parkingLot.vehicleEntry(car1);
  const ticket4 = parkingLot.vehicleEntry(car2);
  const ticket5 = parkingLot.vehicleEntry(car3);

  console.log('\n=== AFTER VEHICLE ENTRY ===');
  parkingLot.getParkingStatus();

  // Simulate some time passing
  console.log('⏰ Simulating time passing...');
  setTimeout(() => {
    console.log('\n=== VEHICLE EXIT PROCESS ===');

    // Vehicle exit with different payment methods
    parkingLot.vehicleExit('BIKE001', 'cash');
    parkingLot.vehicleExit('CAR001', 'card');
    parkingLot.vehicleExit('CAR002', 'upi');

    console.log('\n=== AFTER VEHICLE EXIT ===');
    parkingLot.getParkingStatus();

    // Show ticket information
    console.log('=== TICKET INFORMATION ===');
    const remainingTicket = parkingLot.getTicketInfo('BIKE002');
    if (remainingTicket) {
      console.log(`Vehicle: ${remainingTicket.vehicle.vehicleNo}`);
      console.log(`Type: ${remainingTicket.vehicle.getVehicleType()}`);
      console.log(`Spot: ${remainingTicket.parkingSpot.id}`);
      console.log(`Entry Time: ${remainingTicket.entryTime.toLocaleString()}`);
    }

    console.log('\n✅ Parking Lot Demo Completed Successfully! ✅');
  }, 1000);
}

// Run the demo
runParkingLotDemo();
