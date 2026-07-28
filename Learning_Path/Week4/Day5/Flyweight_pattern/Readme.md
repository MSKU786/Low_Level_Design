Pattern 1 - Flyweight

Share common data across many objects instead of storing duplicate copies in each. Split object state into intrinsic (shared , immutable) and extrinisic(unique per instance, passed in). When thousands of objects share the same data, Flyweight saves massigve memory.

The key distinction:
Intrinsic state: Shared, immutable, stored inside the flyweight (e.g., character font data data, tree texture, icon sprite)

Extinsic State: unique per instance, passed as parameters (e.g. chacter position, tree coordinates, icon positoin on screen)

When to use: You have thousands millions of similar objects tathat share most of their data. A text editor with 10000 characters - each character doesn't need it's own copy of the font definition. A game with 10000 trees - each tree doesn't need it's own copy of tree texture
