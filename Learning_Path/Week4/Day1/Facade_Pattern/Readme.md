Facade Pattern:
Provides a simplified interace to a complex subsystem. Instead of calling 5 different services with 10 different methods, you call on eFacade method that orchestrates everything behind the scenes. Like a hotel concierge - you say "book me a dineer" tehy handle the restaurant search, reservation, transport and confirmation.

When to use: A workflow requires coordinationg multiple subsystems. External consumers shouldn't need to know the internal complexity. You wan t a "one call doe it all" API.

Facade vs Orchestrator- What's the difference?
Almost nothing, The "orchestrator" pattern you've been using (OrderServie, BOokingServcie) is a Facade. The GoF call it facade. Clean Architecure calls it a Use Case. Domain-Driven Design calls it an Applicattion Service. Same Idea, differnt names.
