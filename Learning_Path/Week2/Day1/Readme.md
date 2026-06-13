Encapsulation


Core Idea: Encapsulation means controlling what the outside world can see and do to your object's internals. It's not about hiding the data for secrecy, it's about protecting invariants. If a BankAccount balance should never go negative, the class must control how balance changes, not expose it for anyone to set. 

Public: Accessible everywhere. The class's API contract with the outside world. Default in typscript. 

Private: Accessible within in the class only not even subclasses can see it. Use for internal state and helpers. 

Protected: Accessible within in the class and subclasses. Use when subclasses need to read modify parent state. 

Readonly: Can be set in constructor, never changes after. Use for identity fields that must never mutate. (Like constants)


The Mistake: Making everything public and adding getter/setter for every field. That's not encapsulation, it's bureacuracy. A setBalance() the accepts any number is worse than a public field becuase it looks safe but isn't. 

The Prinicple: Expose behaviours, not data. Instead of setBalance(n), expose depsoit(amount) and withdraw(amount), these enforece business rules. The outside world tells the object what to do, not what to be. 


Connection to SOLID: Encapsulation is how SRP is enforced at the field level. If balance, transaction history and overdraft rules are all private, no external code can bypass your business logic. The class is the single authority for it's own data. 