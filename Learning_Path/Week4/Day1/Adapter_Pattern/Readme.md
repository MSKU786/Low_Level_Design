Adapter Pattern:
Makes an incomptaible interface woek with your code by wrapping it in a translator class. Like a power adapter that let's your indain laptop plugs into european socker - the laptop doesn't change the socket doen't changes the adapter sits in between

When to use:
You have a third party tool, legacy code or external api whose interface doesn't match what your code expects. You can't change the either side so you write a wrapper that translates between them.

Real World Example:

Your code expects PaymentProcessor.charge(amount) but stripe's API uses stripe.charge.create({amount});
You code expects Logger.log(message) but winston used winston.info({message, level})
Your code expects Cache.get(key) but Redis uses redis.hget(namespsce,key);

Connection to DIP:
Every time you wrote an interface in weeks 1-3 and then Implemented tit for a specific provider {StripYametn implements PaymentProcessor}, that was an Adapter, you've been using thsi pattern since day 1 without knowing it's name;
