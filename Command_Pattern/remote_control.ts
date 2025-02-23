interface Command {
  execute(): void;
  undo(): void;
}

class LightOffCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

class LightOnCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }

  undo(): void {
    this.light.off();
  }
}

class Light {
  on() {
    console.log('The light is on');
  }

  off() {
    console.log('The light is off');
  }
}

class NoCommand implements Command {
  execute(): void {
    console.log('No Command');
  }

  undo(): voic {
    console.log('No Command');
  }
}

class RemoteControl {
  onCommands: Command[];
  offCommands: Command[];

  constructor() {
    this.onCommands = new Array(7);
    this.offCommands = new Array(7);
  }
}
