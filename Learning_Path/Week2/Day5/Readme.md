
---
 
## What is UML?
 
**UML (Unified Modeling Language)** is a standardized visual language used to design, document, and communicate software systems. It was created by Grady Booch, Ivar Jacobson, and James Rumbaugh in the 1990s and is now maintained by the Object Management Group (OMG).
 
UML is **not a programming language** — it is a **diagramming standard**. Think of it as a blueprint language for software, similar to how architects use floor plans before constructing a building.
 
### UML has two major categories:
 
| Category | Purpose | Examples |
|---|---|---|
| **Structural** | Describes the static structure of a system | Class, Object, Component |
| **Behavioral** | Describes how a system behaves over time | Sequence, Activity, State Machine |
 
---

## Types of UML Diagrams
 
```
UML Diagrams
├── Structural Diagrams
│   ├── Class Diagram          ← Most important for LLD
│   ├── Object Diagram
│   ├── Component Diagram
│   ├── Package Diagram
│   ├── Deployment Diagram
│   └── Composite Structure Diagram
│
└── Behavioral Diagrams
    ├── Sequence Diagram       ← Second most important for LLD
    ├── Activity Diagram
    ├── Use Case Diagram
    ├── State Machine Diagram
    ├── Communication Diagram
    ├── Interaction Overview Diagram
    └── Timing Diagram
```
 
---
 
## Structural Diagrams
 
### 1. Class Diagram
 
The **most important UML diagram** for LLD. It shows classes, their attributes, methods, and relationships.
 
**Use when:** Designing the object model of a system — Parking Lot, Elevator, ATM, Library, etc.
 
```
┌──────────────────────────┐
│      ClassName           │   ← Class name (bold, centered)
├──────────────────────────┤
│ - privateField: string   │   ← Attributes section
│ # protectedField: int    │
│ + publicField: boolean   │
├──────────────────────────┤
│ + publicMethod(): void   │   ← Methods section
│ - privateMethod(): int   │
│ # protectedMethod(): str │
└──────────────────────────┘
```
 
**Abstract classes** are shown with the class name in *italics*.  
**Interfaces** use the `<<interface>>` stereotype above the name.
 
---
 
### 2. Object Diagram
 
A snapshot of a Class Diagram at a **specific point in time**. Shows actual instances (objects) with real values.
 
**Use when:** Illustrating a concrete example of your class design to make it easier to understand.
 
```
┌──────────────────────────┐
│  car1 : Car              │   ← instanceName : ClassName (underlined)
├──────────────────────────┤
│  brand = "Toyota"        │   ← Actual values, not types
│  model = "Camry"         │
│  speed = 60              │
└──────────────────────────┘
```
 
---
 
### 3. Component Diagram
 
Shows the **high-level components** of a system and how they interact through interfaces.
 
**Use when:** Designing microservices, modular monoliths, or explaining the architecture of a backend service.
 
```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  API Gateway   │────▶│  Auth Service  │────▶│    Database    │
│  <<component>> │     │  <<component>> │     │  <<component>> │
└────────────────┘     └────────────────┘     └────────────────┘
```
 
---
 
### 4. Package Diagram
 
Groups related classes into **packages (namespaces/modules)** and shows dependencies between them.
 
**Use when:** Showing the module structure of your application — useful when discussing clean architecture or layered design.
 
```
┌─────────────────────────────────────┐
│  <<package>> com.app.payment        │
│  ┌──────────┐   ┌────────────────┐  │
│  │ Payment  │   │ PaymentService │  │
│  └──────────┘   └────────────────┘  │
└─────────────────────────────────────┘
            │ depends on
            ▼
┌─────────────────────────────────────┐
│  <<package>> com.app.notification   │
│  ┌──────────────────────────────┐   │
│  │     NotificationService      │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---
 
## Behavioral Diagrams
 
### 1. Sequence Diagram
 
Shows **how objects interact over time** — the order of method calls between objects.
 
**Use when:** Explaining the flow of a specific use case, like "user makes a payment" or "system sends a notification."
 
```
User          OrderService       PaymentService      NotificationService
 │                 │                   │                     │
 │──placeOrder()──▶│                   │                     │
 │                 │──processPayment()─▶│                     │
 │                 │                   │──charge()           │
 │                 │                   │◀──success           │
 │                 │◀──paymentConfirmed│                     │
 │                 │──────────────────────sendConfirmation()─▶│
 │◀──orderConfirmed│                   │                     │
```
 
**Notation:**
- `─────▶` Synchronous call (solid arrow)
- `- - -▶` Return / async message (dashed arrow)
- `│` Lifeline (vertical dashed line)
- `┌───┐` Activation box (rectangle on lifeline showing when object is active)
---
 
### 2. Activity Diagram
 
A flowchart-like diagram showing **business logic and workflows**.
 
**Use when:** Describing algorithms, business rules, or multi-step workflows with conditions.
 
```
        [Start]
           │
           ▼
   ┌───────────────┐
   │  Receive Order │
   └───────────────┘
           │
           ▼
     ◇ In Stock? ◇
    /             \
  Yes              No
   │                │
   ▼                ▼
┌──────────┐   ┌──────────────┐
│ Process  │   │ Notify User  │
│  Order   │   │  (Out of     │
│          │   │   Stock)     │
└──────────┘   └──────────────┘
      │               │
      └───────┬────────┘
              │
              ▼
           [End]
```
 
---
 
### 3. Use Case Diagram
 
Shows **who (actors) does what (use cases)** in the system.
 
**Use when:** Gathering requirements or showing the functional scope of a system at a high level.
 
```
                    ┌──────────────────────────────────┐
                    │         Parking System            │
    ┌────┐          │                                   │
    │    │──────────▶  (Enter Parking Lot)              │
    │User│          │                                   │
    │    │──────────▶  (Make Payment)                   │
    └────┘          │                                   │
                    │                                   │
    ┌─────────┐     │                                   │
    │  Admin  │─────▶  (View Reports)                   │
    └─────────┘     │                                   │
                    └──────────────────────────────────┘
```
 
---
 
### 4. State Machine Diagram
 
Shows the **states an object can be in** and the transitions between states.
 
**Use when:** Modeling objects with a clear lifecycle — Order, Ticket, Booking, Payment, etc.
 
```
                  ┌─────────┐
      ──────────▶ │ CREATED │
                  └─────────┘
                       │
                   confirmed
                       │
                       ▼
                  ┌─────────┐
                  │ PENDING │ ◀──────────────┐
                  └─────────┘                │
                       │                     │ retry
                    paid │                   │
                       ▼                     │
                  ┌─────────┐           ┌──────────┐
                  │  ACTIVE │──failed──▶│  FAILED  │
                  └─────────┘           └──────────┘
                       │
                   completed
                       │
                       ▼
                  ┌──────────┐
                  │ COMPLETED│
                  └──────────┘
```
 
---
 
## Class Diagram Deep Dive
 
### Class Notation
 
```
┌──────────────────────────────┐
│       <<interface>>          │
│         IPayment             │
├──────────────────────────────┤
│                              │   ← No attributes for pure interface
├──────────────────────────────┤
│ + processPayment(            │
│     amount: number,          │
│     currency: string         │
│   ): PaymentResult           │
└──────────────────────────────┘
 
┌──────────────────────────────┐
│       <<abstract>>           │
│         BaseVehicle          │
├──────────────────────────────┤
│ # licensePlate: string       │
│ # size: VehicleSize          │
├──────────────────────────────┤
│ + getLicensePlate(): string  │
│ + getSize(): VehicleSize     │
│ + calculateFee(): number     │   ← italic = abstract method
└──────────────────────────────┘
```
 
---
 
### Relationships
 
Understanding relationships is the **core skill** tested in LLD interviews.
 
#### 1. Inheritance (IS-A) — `──────▷`
Solid line with **open (hollow) arrowhead** pointing to the parent.
 
```
      ┌──────────┐
      │  Animal  │
      └──────────┘
           △           ← Open arrowhead (hollow triangle)
           │
    ┌──────┴──────┐
    │             │
┌───────┐    ┌──────┐
│  Dog  │    │ Cat  │
└───────┘    └──────┘
```
> Dog IS-A Animal. Cat IS-A Animal.
 
---
 
#### 2. Interface Realization / Implementation — `- - - -▷`
Dashed line with **open (hollow) arrowhead** pointing to the interface.
 
```
   ┌──────────────────┐
   │  <<interface>>   │
   │  INotification   │
   └──────────────────┘
             △
           - │ - (dashed)
    ┌────────┴────────┐
    │                 │
┌───────────┐  ┌──────────────┐
│  SMSNotif │  │ EmailNotif   │
└───────────┘  └──────────────┘
```
 
---
 
#### 3. Association — `──────────`
A plain line. Objects know about each other.
 
```
┌──────────┐               ┌──────────┐
│  Student │───────────────│  Course  │
└──────────┘               └──────────┘
```
 
---
 
#### 4. Directed Association — `──────────▶`
One object uses/knows about another (one-directional).
 
```
┌──────────┐               ┌──────────┐
│   User   │──────────────▶│  Order   │
└──────────┘               └──────────┘
```
> User knows about Order. Order does not know about User.
 
---
 
#### 5. Aggregation (HAS-A, weak) — `◇──────────`
Hollow diamond on the **owner side**. The child can exist independently.
 
```
┌──────────┐               ┌──────────┐
│  Team    │◇──────────────│  Player  │
└──────────┘               └──────────┘
```
> Team HAS Players. A Player can exist without the Team (e.g., free agent).
 
---
 
#### 6. Composition (HAS-A, strong) — `◆──────────`
Filled diamond on the **owner side**. The child **cannot exist** without the parent.
 
```
┌──────────┐               ┌──────────┐
│  House   │◆──────────────│   Room   │
└──────────┘               └──────────┘
```
> House HAS Rooms. A Room cannot exist without a House.
 
---
 
#### 7. Dependency — `- - - - - -▶`
Dashed arrow. One class **temporarily uses** another (e.g., method parameter, local variable).
 
```
┌──────────────┐          ┌───────────────┐
│ OrderService │- - - - -▶│ PaymentRequest│
└──────────────┘          └───────────────┘
```
 
---
 
### Relationships Summary Table
 
| Relationship | Symbol | Strength | Lifetime | Example |
|---|---|---|---|---|
| Inheritance | `──▷` | Strongest | — | Dog extends Animal |
| Realization | `- -▷` | Strong | — | EmailService implements INotifier |
| Composition | `◆──` | Strong | Child dies with parent | Room inside House |
| Aggregation | `◇──` | Medium | Child can live independently | Player in Team |
| Association | `───` | Weak | Both exist independently | Student ↔ Course |
| Dependency | `- -▶` | Weakest | Temporary | Service uses DTO |
 
---