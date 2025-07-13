# Parking Lot System - Design Pattern Based Implementation

## Overview

This is a complete parking lot management system implemented using various design patterns. The system handles vehicle entry, parking spot allocation, payment processing, and vehicle exit.

## Design Patterns Used

### 1. **Factory Pattern**

- `ParkingSpotManagerFactory`: Creates appropriate parking spot managers based on vehicle type
- `CostComputationFactory`: Creates cost computation strategies based on vehicle type
- `PaymentFactory`: Creates payment strategies (Cash, Card, UPI)

### 2. **Strategy Pattern**

- `PricingStrategy`: Different pricing strategies (Hourly, Minute-based, Default)
- `PaymentStrategy`: Different payment methods (Cash, Card, UPI)

### 3. **Abstract Factory Pattern**

- `ParkingSpotManager`: Abstract class with concrete implementations for different vehicle types

### 4. **Template Method Pattern**

- `ParkingSpotManager`: Abstract methods for finding parking spots

## System Architecture

### Core Classes

#### 1. **Vehicle** (`Vehicle.ts`)

- Represents vehicles with type (TWO_WHEELER, FOUR_WHEELER)
- Contains vehicle number and type information

#### 2. **ParkingSpot** (`ParkingSpot.ts`)

- Represents individual parking spots
- Tracks availability, vehicle assignment, and pricing

#### 3. **Ticket** (`Ticket.ts`)

- Generated when vehicle enters
- Contains entry time, vehicle info, and parking spot

#### 4. **EntranceGate** (`EntranceGate.ts`)

- Handles vehicle entry process
- Finds parking spots and generates tickets

#### 5. **ExitGate** (`ExitGate.ts`)

- Handles vehicle exit process
- Calculates fees and processes payments

#### 6. **ParkingLot** (`ParkingLot.ts`)

- Main orchestrator class
- Manages the entire parking system

### Payment System

#### Payment Strategies (`PaymentStrategy.ts`)

- `CashPaymentStrategy`: Cash payment processing
- `CardPaymentStrategy`: Card payment processing
- `UPIPaymentStrategy`: UPI payment processing

#### Payment Factory (`PaymentFactory.ts`)

- Creates appropriate payment objects based on method

### Pricing System

#### Pricing Strategies (`PricingStrategy.ts`)

- `HourlyPricingStrategy`: Charges based on hours parked
- `MinutePricingStrategy`: Charges based on minutes parked
- `DefaultPricingStrategy`: Fixed price per spot

#### Cost Computation (`CostComputation.ts`)

- `TwoWheelerCostComputation`: Uses hourly pricing
- `FourWheelerCostComputation`: Uses minute-based pricing

## Usage Example

```typescript
import { ParkingLot } from './ParkingLot';
import { Vehicle, VehicleType } from './Vehicle';

// Initialize parking lot
const parkingLot = new ParkingLot();

// Create vehicles
const bike = new Vehicle('BIKE001', VehicleType.TWO_WHEELER);
const car = new Vehicle('CAR001', VehicleType.FOUR_WHEELER);

// Vehicle entry
const ticket = parkingLot.vehicleEntry(bike);

// Vehicle exit with payment
parkingLot.vehicleExit('BIKE001', 'cash');

// Check parking status
parkingLot.getParkingStatus();
```

## Features

### ✅ Completed Features

1. **Vehicle Entry**: Automatic spot allocation based on vehicle type
2. **Ticket Generation**: Unique tickets with entry time and spot info
3. **Payment Processing**: Multiple payment methods (Cash, Card, UPI)
4. **Dynamic Pricing**: Different pricing strategies for different vehicle types
5. **Vehicle Exit**: Fee calculation and payment processing
6. **Status Monitoring**: Real-time parking lot status
7. **Error Handling**: Comprehensive error handling throughout the system

### 🎯 Key Benefits

- **Scalable**: Easy to add new vehicle types or payment methods
- **Maintainable**: Clear separation of concerns with design patterns
- **Extensible**: New features can be added without modifying existing code
- **Testable**: Each component can be tested independently

## File Structure

```
Design_Pattern_Based/
├── Vehicle.ts                    # Vehicle and VehicleType definitions
├── ParkingSpot.ts               # Individual parking spot management
├── Ticket.ts                    # Parking ticket structure
├── ParkingSpotManger.ts         # Parking spot manager (Factory + Strategy)
├── ParkingSpotManagerFactory.ts # Factory for parking managers
├── EntranceGate.ts              # Vehicle entry processing
├── ExitGate.ts                  # Vehicle exit and payment processing
├── Payment.ts                   # Payment abstract class
├── PaymentStrategy.ts           # Payment strategy implementations
├── PaymentFactory.ts            # Payment factory
├── PricingStrategy.ts           # Pricing strategy implementations
├── CostComputation.ts           # Cost computation logic
├── CostComputationFactory.ts    # Cost computation factory
├── ParkingLot.ts                # Main orchestrator class
├── demo.ts                      # System demonstration
└── README.md                    # This documentation
```

## Running the Demo

To run the parking lot demo:

```bash
# Compile TypeScript
tsc *.ts

# Run the demo
node demo.js
```

## Design Pattern Benefits

1. **Factory Pattern**: Easy to create different types of managers and strategies
2. **Strategy Pattern**: Flexible pricing and payment methods
3. **Abstract Factory**: Consistent interface for different vehicle types
4. **Template Method**: Common parking logic with specific implementations

This implementation demonstrates a production-ready parking lot system with proper separation of concerns, extensibility, and maintainability.
