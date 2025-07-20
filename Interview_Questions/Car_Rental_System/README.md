# Vehicle Rental System - Complete CRUD Operations

This is a comprehensive Vehicle Rental System implementation with complete CRUD (Create, Read, Update, Delete) operations for all entities.

## 🏗️ System Architecture

The system consists of the following main components:

- **User Management**: Handle customer registration and management
- **Store Management**: Manage rental store locations and information
- **Vehicle Management**: Handle vehicle inventory and availability
- **Reservation Management**: Manage booking and reservation lifecycle

## 📁 File Structure

```
Car_Rental_System/
├── VehicleRentalSystem.ts    # Main system class with all CRUD operations
├── User.ts                   # User entity with getters/setters
├── Store.ts                  # Store entity
├── Vehicles.ts               # Vehicle entity and types
├── Reservation.ts            # Reservation entity and status
├── Location.ts               # Location entity
├── VehiceleInventoryManager.ts # Vehicle inventory management
├── demo.ts                   # Demo showcasing all CRUD operations
└── README.md                 # This documentation
```

## 🚀 Features

### 1. User Management (CRUD)

- ✅ **Create**: Register new users with name and driving license
- ✅ **Read**: Find users by ID or driving license number
- ✅ **Update**: Modify user information
- ✅ **Delete**: Remove users from the system
- ✅ **List**: Get all users in the system

### 2. Store Management (CRUD)

- ✅ **Create**: Add new rental stores with location details
- ✅ **Read**: Find stores by ID or location
- ✅ **Update**: Modify store information
- ✅ **Delete**: Remove stores from the system
- ✅ **List**: Get all stores or stores in specific location

### 3. Vehicle Management (CRUD)

- ✅ **Create**: Add vehicles to store inventory
- ✅ **Read**: Find vehicles by ID, store, or type
- ✅ **Update**: Modify vehicle pricing and status
- ✅ **Delete**: Remove vehicles from inventory
- ✅ **List**: Get available vehicles, vehicles by type, etc.

### 4. Reservation Management (CRUD)

- ✅ **Create**: Make new reservations with pickup/drop locations
- ✅ **Read**: Find reservations by ID, user, vehicle, or status
- ✅ **Update**: Change reservation status (scheduled → in-progress → completed)
- ✅ **Delete**: Cancel reservations
- ✅ **List**: Get reservations by various criteria

## 🔧 API Reference

### VehicleRentalSystem Class

#### Constructor

```typescript
constructor(); // No parameters required
```

#### User Operations

```typescript
// Create
createUser(userName: string, drivingLicenseNo: string): User

// Read
getUserById(id: number): User | undefined
getUserByLicense(drivingLicenseNo: string): User | undefined
getAllUsers(): User[]

// Update
updateUser(id: number, userName?: string, drivingLicenseNo?: string): boolean

// Delete
deleteUser(id: number): boolean
```

#### Store Operations

```typescript
// Create
createStore(name: string, location: RentalLocation, phoneNumber: string, owner: string): Store

// Read
getStoreById(id: string): Store | undefined
getStores(location: RentalLocation): Store[]
getAllStores(): Store[]

// Update
updateStore(id: string, name?: string, phoneNumber?: string, owner?: string): boolean

// Delete
deleteStore(id: string): boolean
```

#### Vehicle Operations

```typescript
// Create
createVehicle(storeId: string, type: VehicleTYpe, companyName: string, modelName: string,
             noOfSeat: number, dailyRentalCost: number, hourlyRentalCost: number): Vechicles

// Read
getVehicleById(id: string): Vechicles | undefined
getVehiclesByStore(storeId: string): Vechicles[]
getVehiclesByType(type: VehicleTYpe): Vechicles[]
getAvailableVehicles(): Vechicles[]
getAllVehicles(): Vechicles[]

// Update
updateVehicle(id: string, dailyRentalCost?: number, hourlyRentalCost?: number, status?: Status): boolean

// Delete
deleteVehicle(id: string): boolean
```

#### Reservation Operations

```typescript
// Create
createReservation(userId: number, vehicleId: string, bookedFrom: Date, bookedTill: Date,
                 pickupLocation: RentalLocation, dropLocation: RentalLocation): Reservation | null

// Read
getReservationById(id: number): Reservation | undefined
getReservationsByUser(userId: number): Reservation[]
getReservationsByVehicle(vehicleId: string): Reservation[]
getReservationsByStatus(status: ReservationStatus): Reservation[]
getAllReservations(): Reservation[]

// Update
updateReservationStatus(id: number, status: ReservationStatus): boolean

// Delete
deleteReservation(id: number): boolean
```

#### Search and Filter Operations

```typescript
searchVehiclesByLocation(location: RentalLocation): Vechicles[]
getReservationsInDateRange(startDate: Date, endDate: Date): Reservation[]
getActiveReservations(): Reservation[]
```

## 🎯 Usage Examples

### Basic Usage

```typescript
import { VehicleRentalSystem } from './VehicleRentalSystem';
import { Location } from './Location';
import { VehicleTYpe } from './Vehicles';

// Initialize the system
const rentalSystem = new VehicleRentalSystem();

// Create a user
const user = rentalSystem.createUser('John Doe', 'DL123456789');

// Create a location
const location = new Location();
location.country = 'India';
location.state = 'Maharashtra';
location.city = 'Mumbai';
location.address = '123 Main Street';
location.pincode = 400001;

// Create a store
const store = rentalSystem.createStore(
  'Mumbai Central',
  location,
  '+91-9876543210',
  'Owner 1'
);

// Add a vehicle
const vehicle = rentalSystem.createVehicle(
  store.id,
  VehicleTYpe.car,
  'Honda',
  'City',
  5,
  2000,
  200
);

// Make a reservation
const reservation = rentalSystem.createReservation(
  user.id,
  vehicle.id,
  new Date('2024-01-15'),
  new Date('2024-01-17'),
  location,
  location
);
```

### Advanced Queries

```typescript
// Find all cars available in Mumbai
const mumbaiLocation = new Location();
mumbaiLocation.pincode = 400001;
const carsInMumbai = rentalSystem.searchVehiclesByLocation(mumbaiLocation);

// Get all active reservations
const activeReservations = rentalSystem.getActiveReservations();

// Find reservations for a specific date range
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-31');
const reservationsInRange = rentalSystem.getReservationsInDateRange(
  startDate,
  endDate
);
```

## 🧪 Running the Demo

To see all CRUD operations in action, run the demo:

```bash
# Compile TypeScript
tsc demo.ts

# Run the demo
node demo.js
```

The demo will showcase:

- User creation, reading, updating, and deletion
- Store management operations
- Vehicle inventory management
- Reservation lifecycle management
- Search and filter operations

## 🔒 Data Validation

The system includes several validation checks:

- Vehicle availability before reservation
- User and vehicle existence validation
- Status checks for active vehicles
- Date range validation for reservations

## 🚀 Future Enhancements

Potential improvements for the system:

- Database integration (currently in-memory)
- Payment processing integration
- Real-time availability tracking
- Advanced search with filters
- Email notifications
- Rate limiting and pricing strategies
- Multi-language support

## 📝 Notes

- All data is stored in memory (no persistence)
- IDs are generated randomly for demo purposes
- Location type conflicts with DOM Location are resolved using aliases
- The system follows TypeScript best practices with proper typing
