# SOLID / OOP Rapid Fire Answers

## A1. StripeGateway throws "not supported" on calculateTax()

### Principles Violated:

1. **Interface Segregation Principle (ISP)**  
   The interface is too large and forces implementations to depend on methods they do not need.

2. **Liskov Substitution Principle (LSP)**  
   A subtype should fully behave like its parent contract. Throwing `"not supported"` breaks expected behavior.

---

## A2. Public balance field modified directly

### Missing OOP Concept:

**Encapsulation**

The internal state should not be directly mutable from outside the class.  
Fix it by making `balance` private and exposing controlled methods like `deposit()` and `withdraw()`.

---

## A3. Type-safe Stack for numbers, strings, and objects

### OOP Concept:

**Generics**

Generics allow writing one reusable `Stack<T>` class that works safely with any type without duplication.

---

## A4. 4 attack types × 3 movement types causing 12 subclasses

### Better Approach:

**Composition over Inheritance** using the **Strategy Pattern**

Instead of creating many subclasses, separate attack and movement behaviors into interchangeable strategy objects.

---

## A5. Square extends Rectangle but changes height when width changes

### Principle Violated:

**Liskov Substitution Principle (LSP)**

### Precise Problem:

The subclass changes the expected behavior/contract of the parent class, making `Square` not truly substitutable for `Rectangle`.

---

## A6. OrderService directly imports StripeClient

### Principle Violated:

**Dependency Inversion Principle (DIP)**

High-level modules should not depend on concrete implementations.

### Fix:

Use **Dependency Injection** with an abstraction/interface like `PaymentProvider`.

---

## A7. DataImporter flow: read → validate → transform → save

### Pattern:

**Template Method Pattern**

### Should it be an abstract class or interface?

Use an **abstract class** because it contains shared workflow logic while allowing subclasses to override specific steps.

---

## A8. Adding another else-if branch for new discount type

### Principle Violated:

**Open/Closed Principle (OCP)**

The class is being modified every time a new discount type is added instead of being extended through new implementations.
