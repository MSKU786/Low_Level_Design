CORE IDEA: No client should be forced to depend on methods it doens't use. Instead of one large interface, create serveral small, focused ones so that implementing classes only need to know about the methods that are relevant to them. 


Connection to LSP: When you split FileStorage into Readable, Writable and Deletable -- that was ISP: Today we formalize the thinking and learn to spot fat interface in the wild. 

X The smell: A class implemenation an interface but issues some methoda as throw: new Error("Not Supported") or empty() stubs. That interface is too fat for the client. 

✓ The Test: For each method on your Interface, ask; "Do ALL implementers geninely need this?" if any implementer would stub or throw, the interface needs spitting. 

ISP prevents LSP violatoins, If ReadOnlyStorage never has write() on it's interface, it can never throw on a write cell. The type system does the enforcement. 
Day 3 connection: fat interfaces force subclasses to lie. 