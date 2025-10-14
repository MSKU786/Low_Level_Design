# Elevator System with Simplified TASK Algorithm

## Overview

This project implements a comprehensive elevator system using a **simplified TASK (Three Algorithm Scheduling with K)** algorithm. The system uses built-in JavaScript/TypeScript features for optimal performance and simplicity.

## Architecture

### Design Principles

- **Elevator**: Dumb object with only properties and basic getters/setters
- **ElevatorController**: Contains all TASK algorithm logic and business rules
- **Building**: Orchestrates the entire system

### Separation of Concerns

- ✅ **Elevator**: Pure data object, no business logic
- ✅ **ElevatorController**: Central control unit with all algorithm logic
- ✅ **Building**: System orchestration and initialization
- ✅ **Buttons**: User interface components

## Simplified TASK Algorithm Implementation

### Core Components

#### 1. Built-in Array Sorting (No External Libraries)

- **UP Requests**: Arrays sorted in ascending order using `sort((a, b) => a - b)`
- **DOWN Requests**: Arrays sorted in descending order using `sort((a, b) => b - a)`
- **Simple Data Structures**: Using native `Map` and `Array` objects

#### 2. Key Features

- ✅ **No External Dependencies**: Uses only built-in JavaScript/TypeScript features
- ✅ **Simple Priority Queues**: Implemented with sorted arrays
- ✅ **Intelligent Elevator Selection**: Calculates scores based on distance, direction, and status
- ✅ **Multi-Elevator Support**: Handles multiple elevators with smart dispatching
- ✅ **External & Internal Requests**: Supports both floor buttons and elevator buttons
- ✅ **Real-time Status Tracking**: Monitors elevator positions and directions

### Algorithm Details

#### Elevator Selection Scoring

```typescript
Score = Distance + Direction_Bonus + Status_Bonus + Position_Bonus;
```

**Scoring Factors:**

- **Base Score**: Distance from elevator to requested floor
- **Idle Bonus**: -10 points for idle elevators
- **Direction Bonus**: -5 points for elevators going in same direction
- **Position Bonus**: -20 points if elevator is already at requested floor
- **Opposite Direction Penalty**: +15 points for elevators going opposite direction

#### Request Processing

1. **External Request**: Floor button pressed → Find best elevator → Add to appropriate array
2. **Internal Request**: Elevator button pressed → Add to elevator's array
3. **Processing**: Process requests in sorted order using built-in array methods
4. **Direction Change**: Switch direction when no more requests in current direction

### File Structure

```
C&Coding/
├── Building.ts              # Building management with elevator controller
├── Elevator.ts              # Dumb elevator object (properties only)
├── ElevatorController.ts    # Multi-elevator controller with simplified TASK algorithm
├── External_Button.ts       # Floor button implementation
├── Internal_Button.ts       # Elevator button implementation
├── Floor.ts                 # Floor management
├── Display.ts               # Elevator display system
├── enum.ts                  # Direction and Status enums
├── design.ts                # Demo and testing
└── README.md               # This documentation
```

### Usage Example

```typescript
// Create building with 10 floors and 4 elevators
const building = new Building('B001', 'Tech Tower', '123 Innovation St', 10, 4);

// External request (floor button)
building.getFloor(3)?.getButton().pressUpButton();

// Internal request (elevator button)
building.getInternalButtonDispatcher().submitRequest(1, 5);

// Process requests
building.getElevatorController().controlElevators();
```

### Demo Scenarios

The `design.ts` file includes comprehensive demo scenarios:

1. **Multiple External Requests**: Tests elevator selection with various floor requests
2. **Internal Requests**: Tests elevator button functionality
3. **Complex Mixed Requests**: Tests both external and internal requests simultaneously

### Key Benefits

1. **No External Dependencies**: Uses only built-in JavaScript/TypeScript features
2. **Simple Implementation**: Easy to understand and maintain
3. **Optimal Performance**: Efficient array sorting and processing
4. **Scalable**: Supports any number of elevators and floors
5. **Intelligent**: Smart elevator selection based on multiple factors
6. **Clean Architecture**: Clear separation of concerns with dumb objects and smart controllers

### Algorithm Complexity

- **Time Complexity**: O(n log n) for array sorting (built-in sort)
- **Space Complexity**: O(n) for storing requests
- **Elevator Selection**: O(k) where k is number of elevators

### Built-in Features Used

- **Array.sort()**: For priority queue simulation
- **Array.shift()**: For removing processed requests
- **Array.includes()**: For duplicate checking
- **Map**: For storing elevator requests
- **Built-in Math**: For distance calculations

### Architecture Benefits

- **Maintainability**: Clear separation between data objects and business logic
- **Testability**: Easy to unit test individual components
- **Extensibility**: Easy to add new features without modifying existing code
- **Scalability**: Can easily add more elevators or floors
- **Flexibility**: Can change algorithms without affecting data objects
- **Simplicity**: No external dependencies or complex data structures

### Future Enhancements

- [ ] Add weight-based elevator selection
- [ ] Implement peak hour optimization
- [ ] Add maintenance mode for elevators
- [ ] Implement emergency protocols
- [ ] Add energy efficiency algorithms
- [ ] Add real-time monitoring dashboard

## Running the Demo

```bash
# Compile TypeScript
tsc design.ts

# Run the demo
node design.js
```

The demo will showcase various scenarios demonstrating the simplified TASK algorithm's efficiency in handling multiple elevator requests with proper separation of concerns and no external dependencies.
