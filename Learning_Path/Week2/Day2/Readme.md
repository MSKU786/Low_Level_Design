Core IDea: Inheritance says 'X is a Y' , A Dog is a Animal. Composition has 'X has a Y', A Car has a Engine. Both model relationships, but composition is more flexible. The classic advice: Favor compositiion over inheritance. But know when inheritance is the right call. 


Inheritance(is-a) : Fixed at compile time, One parent only (TS/JS), Subclass is tightly coupled to parent. Changing parent can break all children. Good for: stable, shallow, hierarchies where substituablity matters. 

Composition(has-a) : Flexible at runtime, Combine any number of behaviours. Swap pieces without afffecting others. Good for: Capablities that vary indepnedently, behaviours that mix-and-match.


X The Trap: Modeling real-world "is-a" relationship directly as inheritance. "A Manager is an Employee" feels rights, but when manager needs different payroll, different permission, AND different reporting, you end up overriding everything. The "is-a" was a lie. 

 The Test: WOuld you use the subclass wheever the parent isued wiht identiical behaviour for intherited mehtods? If yes -> inheritnace, if the sublass overrides most things or adds restirctions -> composition. 


The Decisoin Framework: 
Use Inheritance when: the relationship is genuintely "is-a the hierarchy is shallow (2 levels max), the subclass truly substitues for the parent(LSP) and the parent is stable. 

Use composition when, capablities vary independently, you need multple bheaviours mixed together, behaviours might change at runtime, on the hierarchy would go deeper than 2 levels. 

