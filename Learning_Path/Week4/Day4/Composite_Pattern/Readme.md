CORE IDEA:
Compose objects into tree strctures where individual objets and groups of objets (composite) share the same interface. The consumer dones't know or care whether it's dealing with a single item or a group - it calls the same method on both.

The real-world analogy- file system:
A file has a size. A Folder also has a size, it's the sum of everything inside it. You call .getSize() on both without caring with one it is. A folder can contain files AND other folders. That's a composite.

The 3 parts of Composite:

Component: The shared interafe (File and Folder both implement file)
Leaf: Individual object, no children ( a file)
Composite: COntain children ( a Folder) - delegates operations to children recursively

When to use: Whenever you have a tree strcuture where yo uwant to treat "one thing" and "group of things" uniformly. If yo ufind yourself. wirting if (isGroup) {
for ech chiid... } else { handle single itnem } everywhere - that'st the smell. Composite elimates those checks.
