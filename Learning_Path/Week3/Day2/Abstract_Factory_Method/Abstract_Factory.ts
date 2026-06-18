interface Button {
  render(): string;
  onClick(handler: () => void): void;
}

interface Input {
  render(): string;
  getValue(): string;
  setValue(value: string): void;
}

interface Modal {
  render(): string;
  open(): void;
  close(): void;
}

// Step 2: Define dthe abstract Facotry ( thie contract)

interface UIFactory {
  createButton(lable: string): Button;
  createInput(placeHolder: string): Input;
  createModal(title: string): Modal;
}

// That's it abstract factory is just an interface;
// It gurantees; if you use ONE factory, all proudct match.,
// You can't acciendltally mix DarkButton + lightInput
