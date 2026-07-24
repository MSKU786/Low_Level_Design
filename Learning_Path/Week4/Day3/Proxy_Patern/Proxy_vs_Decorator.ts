// Proxy vs Decorator - they LOOK identical, differ in INTENT

// STRUCTURALLY same pattern:
// class Wrapper implements SameInterface {
//  constructor (private inner: SameInterface) {}
//  method(){}
// }

// INTENT - differrent:

// DECORATOR intent: "ADD extra behaviour"
// -- LoggingDecortor: logs THEN delegates (alwsy delegat3es)
// -- RetryDecorator: delegates, retreis on failure (alwsy tries)
// -- TimingDecorator: Times the delegatorion (always delegate)

// Proxy Inent : Control Acess
// -- LaxyProxy: delayes creation until first use (contorl when)
// -> ProtectionProxy : blocks if no permission (may not deleges)
// -> Caching Proxy: Return caches reuslt (may skip inner entirlely)

// Decorator - always logs
class LoggingDecortor implements Database {
  async query(sql: string): Promise<any[]> {
    console.log(`[LOG] ${sql}`);
    const reuslt = await this.inner.query(sql);
    console.log(`[LOG] Done`);
    return reuslt;
  }
}

// PROXY - might block, might skip , might delay
class ProtectionProxy implements Database {
  async query(sql: string): Promise<any[]> {
    if (sql.startsWith('DROP')) {
      throw new Error('DROP queries are blocked');
    }

    return this.inner.query(sql);
  }
}
