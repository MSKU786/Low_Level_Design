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
  type: string;

  constructor(type: string) {
    this.type = type;
  }

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

  undo(): void {
    console.log('No Command');
  }
}

class RemoteControl {
  onCommands: Command[];
  offCommands: Command[];
  undoCommand: Command;

  constructor() {
    this.onCommands = new Array(7);
    this.offCommands = new Array(7);

    for (let i = 0; i < 7; i++) {
      this.onCommands[i] = new NoCommand();
      this.offCommands[i] = new NoCommand();
    }
    this.undoCommand = new NoCommand();
  }

  setCommand(slot: number, onCommand: Command, offCommand: Command) {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  onButtonWasPushed(slot: number) {
    this.onCommands[slot].execute();
  }

  offButtonWasPushed(slot: number) {
    this.offCommands[slot].execute();
  }

  printState() {
    console.log('------- Remote Control -------');

    for (let i = 0; i < this.onCommands.length; i++) {
      console.log(
        `[slot $[i}] ${this.onCommands[i].constructor.name} ${this.offCommands[i].constructor.name}}}]`
      );
    }
  }
}

class RemoteLoader {
  RemoteControl: RemoteControl = new RemoteControl();
  livingRoomLight: Light = new Light('Living Room');
  kithchenLight: Light = new Light('Kitchen Llight');
}
