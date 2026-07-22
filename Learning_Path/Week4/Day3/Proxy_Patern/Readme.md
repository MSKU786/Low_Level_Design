Core Idea: A proxy stands in front of real object and contorls access to ti , same interface, but the proxy decides whether , when and how to forwarrd the call. Like a security gurard at a building entrance, same door, but the guard checks your badge before letting you through.

Proxy vs Decorator --- the critical difference
They look identical structrally (same interface, wraps inner, delegates). The different is intent.

Decorator: "I want to ADD behaviour" -- logging, retry, timing. Always delegates eventually.

Proxy: "I want to control access" , may block, delay or replace the call entirely might not delegate.

Four Type of Proxy:
Virtual Proxy: Delays creating the expensive object until first use (lazy loading)
Protecting Proxy: Checks permissions before allowing access
Caching Proxy: Returns cached results to avoid redundant operations.
Remote Proxy: Repersents an object on a different server(like gRPC stubs)
