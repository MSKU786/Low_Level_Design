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

When NOT to use: IF you only have one product type, Factory Method is simpler. If porudcts doint' need to mathc as a family spearted factiories are cleaner. Don't over-engineer , Absract Facctory adds complexity that only pays off thwne family consistency maaters

The Mental Model:

Factory Method = "Make me ONE thing" -> Factory.create('pawn');
Abstract Factory = "Make me a MATCHING SET" -> Darkfactory.createButton() + darkfactory.createInput();

The Gurantee: If you use one factory afor all products, they will always be compatiable. You can't accidentlaly mix dark button + light input
