/*
  Use Case

  Imagine a customer support system where customer requests need to be handled based on their priority. There are three levels of support: Level 1, Level 2, and Level 3. Level 1 support handles basic requests, Level 2 support handles more complex requests, and Level 3 support handles critical issues that cannot be resolved by Level 1 or Level 2.
*/

interface SupportHandler {
  handleRequest(request: Request);
  setNextHandler(nextHandler: SupportHandler);
}

class LevelOneHandler implements SupportHandler {
  private nextHandler: SupportHandler;

  handleRequest(request: Request) {
    console.log('Request handled by Level One');

    if (this.nextHandler != null) {
      this.nextHandler.handleRequest(request);
    }
  }

  setNextHandler(nextHandler: SupportHandler) {
    this.nextHandler = nextHandler;
  }
}
