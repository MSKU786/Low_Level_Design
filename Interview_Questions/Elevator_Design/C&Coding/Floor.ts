import { ExternalButton, ExternalButtonDispatcher } from './External_Button';

export class Floor {
  id: number;
  button: ExternalButton;

  constructor(id: number, dispatcher: ExternalButtonDispatcher) {
    this.id = id;
    this.button = new ExternalButton(id, dispatcher);
  }

  // Get floor ID
  getId(): number {
    return this.id;
  }

  // Get external button
  getButton(): ExternalButton {
    return this.button;
  }
}
