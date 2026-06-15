# Design Patterns — Week 3 Day 1

## Pattern 1 — Singleton

Description

- Ensures a class has exactly one instance and provides a global point of access to it.

When to use

- Resource managers that are expensive or unsafe to duplicate, for example:
  - Database connection pools
  - Logger instances writing to the same file
  - Configuration managers or in-memory caches

When NOT to use (Anti-pattern)

- Avoid using a singleton solely to make something "globally accessible." Doing so to avoid passing dependencies is a violation of the Dependency Inversion Principle (DIP).
- Many so-called singletons are better modeled as regular classes instantiated once at the application's composition root.

## Pattern 2 — Factory Method

Description

- Defines an interface for creating objects and lets subclasses or a factory method decide which concrete class to instantiate. Consumers call the factory instead of using `new` directly.

When to use

- When the concrete type depends on runtime data (configuration, user input, file type).
- When you want to centralize or encapsulate object-creation logic.
- When adding new types should not require changes to consumers.

Variants and related patterns

- Simple Factory: A static method that creates objects (not a GoF pattern, but commonly used).
- Factory Method: Subclasses override a creation method (a GoF pattern).
- Abstract Factory: Produces families of related objects (a factory of factories).

## Notes

- Prefer clear dependency wiring over abusing singletons for global access.
- Use factories to keep creation concerns separate from business logic.

---
