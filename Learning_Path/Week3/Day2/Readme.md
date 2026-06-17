CORE IDEA:
An Abstract Factory creates families of related objects that musk work together - without specifying their concrete
classes. A single factory call gives you a Button, an input, and a Modal that all belong to the same theme. Switch the factory -> switch to entire family.

Factory Method vs Abstract Factory:
Factore Method (Day 15) : Creates ONE type of object PieceFactory.create("pawn") -> return a Pawn.
Abstract Factory (Today): Create a family of related objects. DarkThemeFactory -> return Dark Button + dark input + dark Modal - all guranted to match.

Aspect Factory Method Abstract Factory

Creates One Product Type Family of related products
Varies by Which subclass of the product Which family theme/platform
Example create("pawn") -> Pawn DarkFactory -> dark Button + dark input
Ensures Right Subclass created All product in family are compatiable

When to use: When yyou have mutlple objetcs that MUST be created together as a matching set --- UI themes, database drivers (connection + query builder + migration tool all for the same DB), cross platform components (IOS button + IOS input vs Andorid Button + Andorid input).
