/*
  Use Case

  Imagine a customer support system where customer requests need to be handled based on their priority. There are three levels of support: Level 1, Level 2, and Level 3. Level 1 support handles basic requests, Level 2 support handles more complex requests, and Level 3 support handles critical issues that cannot be resolved by Level 1 or Level 2.
*/

interface SupportHandler {
  handleIssue(request: Issue);
  setNextHandler(nextHandler: SupportHandler);
}

class LevelOneHandler implements SupportHandler {
  private nextHandler: SupportHandler;

  handleIssue(request: Issue) {
    if (request.getPriority() == Priorty.Low) {
      console.log('Handled by level one handler');
    } else if (this.nextHandler != null) {
      this.nextHandler.handleIssue(request);
    }
  }

  setNextHandler(nextHandler: SupportHandler) {
    this.nextHandler = nextHandler;
  }
}

class LevelTwoHandler implements SupportHandler {
  private nextHandler: SupportHandler;

  handleIssue(request: Issue) {
    if (request.getPriority() == Priorty.Medium) {
      console.log('Handled by level two handler');
    } else if (this.nextHandler != null) {
      this.nextHandler.handleIssue(request);
    }
  }

  setNextHandler(nextHandler: SupportHandler) {
    this.nextHandler = nextHandler;
  }
}

class LevelThreeHandler implements SupportHandler {
  private nextHandler: SupportHandler;

  handleIssue(request: Issue) {
    if (request.getPriority() == Priorty.High) {
      console.log('Handled by level three handler');
    } else if (this.nextHandler != null) {
      this.nextHandler.handleIssue(request);
    }
  }

  setNextHandler(nextHandler: SupportHandler) {
    this.nextHandler = nextHandler;
  }
}

enum Priorty {
  Low = 'low',
  Medium = 'Medium',
  High = 'High',
}

class Issue {
  private priority: Priorty;

  constructor(priority: Priorty) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }
}

function main() {
  const levelOneHadler = new LevelOneHandler();
  const levelTwoHandler = new LevelTwoHandler();
  const levelThreeHandler = new LevelThreeHandler();

  levelOneHadler.setNextHandler(levelOneHadler);
  levelTwoHandler.setNextHandler(levelThreeHandler);

  const request1 = new Issue(Priorty.Low);
  const request2 = new Issue(Priorty.Medium);
  const request3 = new Issue(Priorty.High);

  levelOneHadler.handleIssue(request1);
  levelTwoHandler.handleIssue(request2);
  levelThreeHandler.handleIssue(request3);
}
