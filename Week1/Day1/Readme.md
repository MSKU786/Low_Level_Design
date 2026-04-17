Code Area:A class should have only one reason to change. That "reason" is a person or group -- a stackholder. If the CFO's reporting needs and the CTO's logging needs both require changes to the same class, that class has two responsiblities. 

X Common Myth: "SRP means a class should only do one thig" -- this leasds to hunderds of tiny classes that do nothing useful. A class with 10 methods can still have on responsiblity. 

 The real test: Ask "Who would reques a change to this class?" if the answer is more than one stakeholder with differnt concerns split it. 

 