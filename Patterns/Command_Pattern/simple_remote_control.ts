interface CommandMini {
  execute(): void;
}

class LightMOffCommandMini implements CommandMini {
  light: LightM;

  constructor(light: LightM) {
    this.light = light;
  }

  execute() {
    this.light.off();
  }
}

class LightMOnCommandMini implements CommandMini {
  light: LightM;

  constructor(light: LightM) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }
}

class LightM {
  on() {
    console.log('The light is on');
  }

  off() {
    console.log('The light is off');
  }
}

class SimpleRemoteControl {
  slot: CommandMini | null = null;

  setCommandMini(commandMini: CommandMini): void {
    this.slot = commandMini;
  }

  buttonWasPressed() {
    this.slot?.execute();
  }
}

class RemoteControlTest {
  simpleRemote: SimpleRemoteControl;
  light: LightM;
  constructor() {
    this.simpleRemote = new SimpleRemoteControl();
    this.light = new LightM();
    let lightOn = new LightMOnCommandMini(this.light);
    this.simpleRemote.setCommandMini(lightOn);

    this.simpleRemote.buttonWasPressed();
  }
}
