Core Idea: If S is a subtype of T, you should be able to replace every occurence of T with S and the program should still behaves correctly. The subclass must honor every promise the parent class makes - not just the matches signatures but the behavioural contracts as well.

X Common Misunderstanding: "LSP just means subclass should implement all the parent methods" No -- Typescipt already enforces that at the compile time. LSP's is about behaviour not just signatures

Connection to Day 2 => OCP depends on LSP: The whole strategy patterns work because we that every ShippingStrategy is a proper shipping strategy. If one simply return 0 or throws error for valid input out open closed prinicpal fall apart
