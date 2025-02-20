interface Command {
  execute(): void;
}

class LightOffCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.off();
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
}

class Light {
  on() {
    console.log('The light is on');
  }

  off() {
    console.log('The light is off');
  }
}

class SimpleRemoteControl {
  slot: Command | null = null;

  setCommand(command: Command): void {
    this.slot = command;
  }

  buttonWasPressed() {
    this.slot?.execute();
  }
}

class RemoteControlTest {
  simpleRemote: SimpleRemoteControl;
  light: Light;
  constructor() {
    this.simpleRemote = new SimpleRemoteControl();
    this.light = new Light();
    let lightOn = new LightOnCommand(this.light);
    this.simpleRemote.setCommand(lightOn);

    this.simpleRemote.buttonWasPressed();
  }
}
