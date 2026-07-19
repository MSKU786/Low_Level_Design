Decorator Pattern:

CORE IDEA:
Attach additoinal behaviour to an object dynamically by wrapping it in an another object that has the smae interface . THe wrapper delegates to the original and adds its own logic before or after. Loke wrapping a gift- the box changes, but hte gift inside is the same

The problme it solveds- inheritance explosion:

You want logging + retry + caching on a notifcation service. With inheritance you'd need.
LoggingNotifier, RetryNotifier, Caching Notifier, LogginRetryNotifier, LogginCachingNotifier, RetyCachingRNotifier, LogginRetryCachingNotifier
7 classes for 3 behaviours! Add a 4th behaviour -> 15 classes. This is combinatorial explosion.

The Decorator Pattern:
Write ONE class per behavour. Combine them by wrappin gnew Rerty(new Logging(new Caching (new EmailNotifier())))
3 behavkour = 3 classes 4th behaviour = 1 more class. Any cominbations, any order.

The 3 rules of Decorator:

1. Same Interface - The decorator implements the same interace as the thing it wraps.
2. Has - a intter -- the decorator holds a reference to the the wrapped object
3. Delegates + addes -- calls the innter object's method, adds behaviour before/after
