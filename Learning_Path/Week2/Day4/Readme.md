Abstraction:

CORE IDEA: Both abstract classes and interfaces define contracts. The difference: and abstract calss can provide shared implementation (template methods, default behaviour, shard state), while an interface is a pure contract with zero implementation. Choose based on whether subclasses need shared code orjust a shared shape. 


Abstract Class: Can have implemnted methods + abstract ones. Can hold state(fields). Single inheritance only, use when subclasses share behaviour, not jus shape. 
Think: "Base class with holes to fill in"

Interface : Pure shape - no implemntation, no state, Multiple interfaces allowed. Use when you need a contract that many unvealted classes can implement. 
Think: Capablity Badge


The Practical Rule: Start with the interface, Upgrade to abstract class only when you find yourself duplicating the same implementation across different class that share a logical "is-a" relationship. Interfaces are lighter more flexible and composable. 


When abstract class Shine -> The template method pattern

Template Method: The abstract class define the algorithm skelton. Subclasses fill in the specific steps, overall flow is always fixed as per template only the details vary. This is one of the pattery where abstract classes are clearly better than interfaces
