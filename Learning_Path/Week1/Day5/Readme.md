CORE IDEA: (Dependency Inversion Principle) High-level modules should not depend on low-level modules. Both should depend on abstractions. The direction of dependency get inverted -- instead of our business logic depending on infrastructure, infrastructure should depends on interfaces that business logic defines. 

Rule A: High level modules should not depend on or import from low level moduels. Both should depend on abstractions(interface)

Rule B: Abstrcations should not depend on details. Details(concrete classes) should depend on abstractions. 


X Common Confusion: 'DIP is just using the interaces" No --- it's about who owns the interface. The high-level modules defines the interface. the low level modules implements it. The dependency arrow points inward/toward your business logic. 

✓ The Test: Can you swap you database , email provider, or payment gateway with changing a single line of business logic? If yes, your dependecy are proprly inverted. 