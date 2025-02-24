interface Command {
  execute(): void;
  undo(): void;
}

class NoCommand implements Command {
  execute(): void {
    console.log('No Command');
  }

  undo(): void {
    console.log('No Command');
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

const CeilingFanState = Object.freeze({
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  OFF: 0,
});

class CeilingFan {
  type: string;
  state: number;

  constructor(type: string) {
    this.type = type;
    this.state = CeilingFanState.OFF;
  }

  High(): void {
    this.state = CeilingFanState.HIGH;
  }

  Medium(): void {
    this.state = CeilingFanState.MEDIUM;
  }

  Low(): void {
    this.state = CeilingFanState.LOW;
  }

  Off(): void {
    this.state = CeilingFanState.OFF;
  }
}

class CeilingFanMediumCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.state;
    this.ceilingFan.Medium();
  }

  undo(): void {
    this.ceilingFan.state = this.prevSpeed;
  }
}

class CeilingFanLowCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.state;
    this.ceilingFan.Low();
  }

  undo(): void {
    this.ceilingFan.state = this.prevSpeed;
  }
}

class CeilingFanHighCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.state;
    this.ceilingFan.High();
  }

  undo(): void {
    this.ceilingFan.state = this.prevSpeed;
  }
}

class CeilingFanOffCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.state;
    this.ceilingFan.Off();
  }

  undo(): void {
    this.ceilingFan.state = this.prevSpeed;
  }
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
  remoteControl: RemoteControl = new RemoteControl();
  livingRoomLight: Light = new Light('Living Room');
  kitchenLight: Light = new Light('Kitchen Llight');
  LRceilingFan: CeilingFan = new CeilingFan('Living Room');

  livingRoomLightOn: LightOnCommand = new LightOnCommand(this.livingRoomLight);
  livingRoomLightOff: LightOffCommand = new LightOffCommand(
    this.livingRoomLight
  );

  kitchenLightOn: LightOnCommand = new LightOnCommand(this.kitchenLight);
  kitchenLightOff: LightOffCommand = new LightOffCommand(this.kitchenLight);

  ceilingFanHigh: CeilingFanHighCommand = new CeilingFanHighCommand(
    this.LRceilingFan
  );
  ceilingFanOff: CeilingFanOffCommand = new CeilingFanOffCommand(
    this.LRceilingFan
  );
  ceilingFanMedium: CeilingFanMediumCommand = new CeilingFanMediumCommand(
    this.LRceilingFan
  );

  intialize() {
    this.remoteControl.setCommand(
      0,
      this.livingRoomLightOn,
      this.livingRoomLightOff
    );
    this.remoteControl.setCommand(1, this.kitchenLightOn, this.kitchenLightOff);
    this.remoteControl.setCommand(2, this.ceilingFanHigh, this.ceilingFanOff);
    this.remoteControl.setCommand(3, this.ceilingFanMedium, this.ceilingFanOff);

    this.remoteControl.printState();

    this.remoteControl.onButtonWasPushed(0);
    this.remoteControl.onButtonWasPushed(3);
    this.remoteControl.onButtonWasPushed(2);
    this.remoteControl.offButtonWasPushed(2);
    this.remoteControl.offButtonWasPushed(0);
  }
}
