class LoginForm {
  private button: Button;
  private emailInput: Input;
  private passwordInput: Input;
  private errorModal: Modal;

  // Recieves the factory - deosn't know if it's dark or light
  constructor(private ui: UIFactory) {
    this.emailInput = ui.createInput('Enter Email');
    this.passwordInput = ui.createInput('ENter Password');
    this.button = ui.createButton('Sign In');
    this.errorModal = ui.createModal('Login Error');
  }

  render(): string {
    return [
      this.emailInput.render(),
      this.passwordInput.render(),
      this.button.render(),
    ].join('\n');
  }
}

// Composition Root

// Switch theme by siwthcing one factory - entire app re-themes

const theme = process.env.THEME ?? 'dark';

let factory: UIFactory;
if (theme === 'dark') {
  factory = new DarkThemeFactory();
} else {
  factory = new LightThemeFactory();
}

// Eveery component in the app uses the same factory
const loginForm = new LoginForm(factory);
const settingsForm = new SettingForm(factory);
const dashbarod = new Dashboard(factory);

// Swithcing from dark to light?
// Change ONE line (the factory), every component re-themes
// No component knows which theme it's using.

// == Even better: use a registr factory for themes

class ThemeRegistry {
  private factories = new Map<string, UIFactory>();

  register(name: string, factory: UIFactory): void {
    this.factories.set(name, factory);
  }

  getFactory(name: string): UIFactory {
    const factory = this.factories.get(name);
    if (!factory) throw new Error(`Unkonw theme: ${name}`);
    return factory;
  }
}

const themes = new ThemeRegistry();
themes.register('dark', new DarkThemeFactory());
themes.register('ligth', new LightThemeFactory());

const activeFactory = themes.getFactory(process.env.THEME ?? 'dark');
const app = new LoginForm(activeFactory);
