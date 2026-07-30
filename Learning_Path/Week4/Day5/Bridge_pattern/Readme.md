BRIDGET PATTERN

CORE IDEA: Separte an abstraction (what you do) from it's implementation (how you do it) so they can vary independently. Instead of one class hierarchy that combines both, you split into two, one for the 'what" and one for the "how", connected by a reference (the bridge).

The Problem Bridge Solves - class explosion:
You have shapes (Circles, Square, Triangle) X renderes(SVG, Canvas, WebGL). Without brigdte: SVG Circle, SVGSquare, SVGTriganlge, CanvasCircle, CanvasSquare, CanvasTriagenle .. 3* 3 = 9 Classes Add a newq or renderer -> explosion With Bridge: 3 Shapes * 3 renderes = 6 classes , connected by composition.

When to use: When you have two independent dimensions of variations. If adding a new type of one axis forces changes across the other axis, you need Bridge. The "what" and "how" should evolve independently.
