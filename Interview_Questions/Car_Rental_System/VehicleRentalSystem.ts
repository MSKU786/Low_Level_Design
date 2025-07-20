import { Location as RentalLocation } from './Location';
import { Store } from './Store';
import { User } from './User';
import { Vechicles, VehicleTYpe, Status } from './Vehicles';
import { Reservation, ReservationStatus } from './Reservation';

export class VehicleRentalSystem {
  private users: User[];
  private stores: Store[];
  private vehicles: Vechicles[];
  private reservations: Reservation[];

  constructor() {
    this.users = [];
    this.stores = [];
    this.vehicles = [];
    this.reservations = [];
  }

  // ==================== USER CRUD OPERATIONS ====================

  // Create User
  createUser(userName: string, drivingLicenseNo: string): User {
    const id = this.generateId();
    const user = new User(id, userName, drivingLicenseNo);
    this.users.push(user);
    return user;
  }

  // Read User
  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserByLicense(drivingLicenseNo: string): User | undefined {
    return this.users.find(
      (user) => user.drivingLicenseNo === drivingLicenseNo
    );
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  // Update User
  updateUser(
    id: number,
    userName?: string,
    drivingLicenseNo?: string
  ): boolean {
    const user = this.getUserById(id);
    if (user) {
      if (userName) user.userName = userName;
      if (drivingLicenseNo) user.drivingLicenseNo = drivingLicenseNo;
      return true;
    }
    return false;
  }

  // Delete User
  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== STORE CRUD OPERATIONS ====================

  // Create Store
  createStore(
    name: string,
    location: RentalLocation,
    phoneNumber: string,
    owner: string
  ): Store {
    const store = new Store();
    store.id = this.generateStoreId();
    store.name = name;
    store.location = location;
    store.phoneNumber = phoneNumber;
    store.owner = owner;
    store.reservation = [];
    this.stores.push(store);
    return store;
  }

  // Read Store
  getStoreById(id: string): Store | undefined {
    return this.stores.find((store) => store.id === id);
  }

  getStores(location: RentalLocation): Store[] {
    return this.stores.filter(
      (store) => store.location.pincode === location.pincode
    );
  }

  getAllStores(): Store[] {
    return [...this.stores];
  }

  // Update Store
  updateStore(
    id: string,
    name?: string,
    phoneNumber?: string,
    owner?: string
  ): boolean {
    const store = this.getStoreById(id);
    if (store) {
      if (name) store.name = name;
      if (phoneNumber) store.phoneNumber = phoneNumber;
      if (owner) store.owner = owner;
      return true;
    }
    return false;
  }

  // Delete Store
  deleteStore(id: string): boolean {
    const index = this.stores.findIndex((store) => store.id === id);
    if (index !== -1) {
      this.stores.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== VEHICLE CRUD OPERATIONS ====================

  // Create Vehicle
  createVehicle(
    storeId: string,
    type: VehicleTYpe,
    companyName: string,
    modelName: string,
    noOfSeat: number,
    dailyRentalCost: number,
    hourlyRentalCost: number
  ): Vechicles {
    const vehicle = new Vechicles();
    vehicle.id = this.generateVehicleId();
    vehicle.StoreId = storeId;
    vehicle.type = type;
    vehicle.companyName = companyName;
    vehicle.modelName = modelName;
    vehicle.noOfSeat = noOfSeat;
    vehicle.dailyRentalCost = dailyRentalCost;
    vehicle.hourlyRentalCost = hourlyRentalCost;
    vehicle.kmDriven = 0;
    vehicle.status = Status.active;
    this.vehicles.push(vehicle);
    return vehicle;
  }

  // Read Vehicle
  getVehicleById(id: string): Vechicles | undefined {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }

  getVehiclesByStore(storeId: string): Vechicles[] {
    return this.vehicles.filter((vehicle) => vehicle.StoreId === storeId);
  }

  getVehiclesByType(type: VehicleTYpe): Vechicles[] {
    return this.vehicles.filter(
      (vehicle) => vehicle.type === type && vehicle.status === Status.active
    );
  }

  getAvailableVehicles(): Vechicles[] {
    return this.vehicles.filter((vehicle) => vehicle.status === Status.active);
  }

  getAllVehicles(): Vechicles[] {
    return [...this.vehicles];
  }

  // Update Vehicle
  updateVehicle(
    id: string,
    dailyRentalCost?: number,
    hourlyRentalCost?: number,
    status?: Status
  ): boolean {
    const vehicle = this.getVehicleById(id);
    if (vehicle) {
      if (dailyRentalCost !== undefined)
        vehicle.dailyRentalCost = dailyRentalCost;
      if (hourlyRentalCost !== undefined)
        vehicle.hourlyRentalCost = hourlyRentalCost;
      if (status !== undefined) vehicle.status = status;
      return true;
    }
    return false;
  }

  // Delete Vehicle
  deleteVehicle(id: string): boolean {
    const index = this.vehicles.findIndex((vehicle) => vehicle.id === id);
    if (index !== -1) {
      this.vehicles.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== RESERVATION CRUD OPERATIONS ====================

  // Create Reservation
  createReservation(
    userId: number,
    vehicleId: string,
    bookedFrom: Date,
    bookedTill: Date,
    pickupLocation: RentalLocation,
    dropLocation: RentalLocation
  ): Reservation | null {
    const user = this.getUserById(userId);
    const vehicle = this.getVehicleById(vehicleId);

    if (!user || !vehicle) {
      return null;
    }

    if (vehicle.status !== Status.active) {
      return null;
    }

    const reservation = new Reservation();
    reservation.id = this.generateReservationId();
    reservation.user = user;
    reservation.vehicle = vehicle;
    reservation.bookingDate = new Date();
    reservation.bookedFrom = bookedFrom;
    reservation.bookedTill = bookedTill;
    reservation.status = ReservationStatus.SCHEDULED;
    reservation.pickupLocation = pickupLocation;
    reservation.dropLocation = dropLocation;

    this.reservations.push(reservation);
    return reservation;
  }

  // Read Reservation
  getReservationById(id: number): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  getReservationsByUser(userId: number): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.user.id === userId
    );
  }

  getReservationsByVehicle(vehicleId: string): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.vehicle.id === vehicleId
    );
  }

  getReservationsByStatus(status: ReservationStatus): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.status === status
    );
  }

  getAllReservations(): Reservation[] {
    return [...this.reservations];
  }

  // Update Reservation
  updateReservationStatus(id: number, status: ReservationStatus): boolean {
    const reservation = this.getReservationById(id);
    if (reservation) {
      reservation.status = status;
      return true;
    }
    return false;
  }

  // Delete Reservation
  deleteReservation(id: number): boolean {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === id
    );
    if (index !== -1) {
      this.reservations.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== UTILITY METHODS ====================

  private generateId(): number {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  private generateStoreId(): string {
    return (
      'STORE_' +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
    );
  }

  private generateVehicleId(): string {
    return (
      'VEH_' +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, '0')
    );
  }

  private generateReservationId(): number {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  // ==================== SEARCH AND FILTER METHODS ====================

  searchVehiclesByLocation(location: RentalLocation): Vechicles[] {
    const storesInLocation = this.getStores(location);
    const storeIds = storesInLocation.map((store) => store.id);
    return this.vehicles.filter(
      (vehicle) =>
        storeIds.includes(vehicle.StoreId) && vehicle.status === Status.active
    );
  }

  getReservationsInDateRange(startDate: Date, endDate: Date): Reservation[] {
    return this.reservations.filter(
      (reservation) =>
        reservation.bookedFrom >= startDate && reservation.bookedTill <= endDate
    );
  }

  getActiveReservations(): Reservation[] {
    return this.reservations.filter(
      (reservation) =>
        reservation.status === ReservationStatus.INPROGRESS ||
        reservation.status === ReservationStatus.SCHEDULED
    );
  }
}
