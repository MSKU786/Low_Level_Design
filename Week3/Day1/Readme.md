Pattern 1: Singleton

Ensure a class has single exactly one instance and provides a global pont of access of it. Use it when mutiple
instances would cause problem, like two database connection pools, two loggers writing to the same file, or two config manager with different state.

When to use: Data connection pools, logger instances, configuration managers, caches -- resources that are expensive to create and must be shared across the app.

When NOT to use (anti-pattern) : Don't use SIgnle just to make somehting 'globally accessbile", if you are using it to avoid passing dependencies thorugh constructors. , tha'ts a DIP violation disguised as a patterns. Most' "Singletons" in codebases should actualy be regrular classes wired once int he componsition root.

Pattern 2: Factory Method

Defines an interface for creating objects but let's subclasses or a method decide which calss to instantiate. INStead of calling new ConcreteClass() direclty. You call a factory that return the right type based on input. The decoupes object creation from object usage.

When to use: When the exact type to create depends on runtime data(config, user input, file type). When you want to centralize object creation logic. When adding a new type should not required editing the consumer.

Factory Method vs Abstract Method vs Simple Factory:
Simple Factory: A static method that creates object - not a GoF pattern but very common
Factory Method: Subclasses override the creation method - actual GoF pattern
Abstract Factory: A factory of Factories - creates families of related objects
