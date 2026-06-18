function renderForm(theme: string) {
  let butotn, input, moda;

  if (theme === 'dark') {
    button = new DarkButton();
    input = new DarkInput();
    modal = new DarkModal();
  } else if (theme === 'light') {
    button = new LightButton();
    input = new LightInput();
    modal = new LightModal();
  } else if (theme === 'high-contrast') {
    button = new HighContrastButton();
    input = new HighContrastInput();
    modal = new HighContrastModal();
  }

  // Problem:
  // OCP: new theme = edit every renderFOrm-like function
  // Bug Risk: what if someone mixes DarkButotn + LightInput
  // Duplication: This if/else repeats in every component
  // No gurantee the fai,y stays consistent
}
