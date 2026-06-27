CORE IDEA:
Creates new object by cloning the existing object(the prototype) rather than constructing the new object from scratch. Useful when object creation is expensive, complex or wehn you want to create a variations of pre-configured templates.

When to use:

1. Object creation is expensive(DB queries, API calls, heavy computation during setup)
2. You need many variations of base configuration - clone the base, tweak the differences
3. You want a template/present system , users start from a template and customize
4. YOu want to avoid complex constructor hierarchies - clone and modify instead

The Critical Trap: (Shallow vs deep copy)
Shallow clone copies fied vlaues. If a field is an object/array., the clone shares the SAME refernces. Modify the clone's array -> the originals' arrray changes too. This is the #1 source of prototype pattern bugs
