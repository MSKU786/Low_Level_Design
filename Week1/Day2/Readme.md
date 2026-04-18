OPEN CLOSE PRINCIPLE:

CORE IDEA:
Software entities should be open for extension but closed for modification. When you need to add new behaviour, you should be able to able to do it by writing new code -- not by editing existing, tested and working code.

X The smell: Every time a new requirement arrives, you find yourself adding another if/else or switch case to an exsiting function. Each edit risks breaking the class that already work.

✓ The Fix: Define a contract (interface/abstract class). Each new behaviour is a new class that implements the contract. The core data never changes -- it just calls the contract.

Connection to Day 1: OCP is the reason SRP exists. If each responsiblity is isolated behind an interface, adding a new variant of that responsiblity mean writing a new class -- not touching the orchestrator.
