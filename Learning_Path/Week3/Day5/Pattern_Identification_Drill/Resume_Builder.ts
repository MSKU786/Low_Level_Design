// Part 2: Multi-pattern scenario (the real interview question)

// 6 Design a resume builder application

// Users create resumes from templates. Requirements:

// A. The app has pre-made templates: "Professional", "Creative", "Technical", "Academic". Each template has pre-configured sections, fonts, colors, and layout.

// B. Users pick a template, then customize: add/remove sections, change content, adjust styling. Two users starting from "Professional" should get independent copies.

// C. Each template has a family of matched components: Header, Section, SkillBar, Timeline all styled consistently. "Creative" template's components all use rounded corners and vibrant colors. You can't mix a Creative header with a Professional section.

// D. A resume has many fields: personal info (name, email, phone, location, website, LinkedIn), summary (optional), work experience (list), education (list), skills (list), certifications (optional), languages (optional), custom sections. Constructor would be nightmare.

// E. The app configuration (API keys, feature flags, template URLs) should be loaded once and shared across all services.

// F. Export format is determined at runtime: PDF, DOCX, HTML. New formats added periodically.

// For each requirement (A-F), identify the creational pattern and explain in one sentence why.

// Product Interface

interface Header {
  render(): string;
}
interface Section {
  render(): string;
}
interface SkillBar {
  reader(): string;
}

interface TemplateComponentFactory {
  createHeader(name: string): Header;
  createSection(title: string): Section;
  createSkillBar(skil: string, level: number): SkillBar;
}

// Professional Family - all component match
class ProfessionalHeader implements Header {
  constructor(private name: string) {}
  render(): string {
    `<header class="professional"> ${this.name} </header>`;
  }
}

class ProfessionalSection implements Section {}

class ProfessionalSkillBar implements SkillBar {}

class ProfessionalFactory implements TemplateComponentFactory {
  createHeader(name: string): Header {
    return new ProfessionalHeader(name);
  }

  createSection(title: string): Section {
    return new ProfessionalSection(title);
  }

  createSkillBar(skil: string, level: number): SkillBar {
    return new ProfessionalSkillBar(skil, level);
  }
}

class CreativeHeader implements Header {
  constructor(private name: string) {}
  render(): string {
    `<header class="creative"> ${this.name} </header>`;
  }
}

class CreativeSection implements Section {}

class CreativeSkillBar implements SkillBar {}

class CreativeFactory implements TemplateComponentFactory {
  createHeader(name: string): Header {
    return new CreativeHeader(name);
  }

  createSection(title: string): Section {
    return new CreativeSection(title);
  }

  createSkillBar(skil: string, level: number): SkillBar {
    return new CreativeSkillBar(skil, level);
  }
}

class TechnicalHeader implements Header {
  constructor(private name: string) {}
  render(): string {
    `<header class="technical"> ${this.name} </header>`;
  }
}

class TechnicalSection implements Section {}

class TechnicalSkillBar implements SkillBar {}

class TechnicalFactory implements TemplateComponentFactory {
  createHeader(name: string): Header {
    return new TechnicalHeader(name);
  }

  createSection(title: string): Section {
    return new TechnicalSection(title);
  }

  createSkillBar(skil: string, level: number): SkillBar {
    return new TechnicalSkillBar(skil, level);
  }
}

interface Clonable<T> {
  clone(): T;
}

class ResumeTemplate implements Clonable<ResumeTemplate> {
  constructor(
    public name: string,
    public factory: TemplateComponentFactory,
    public sections: string[],
    public styles: { font: string; color: string },
  ) {}

  clone(): ResumeTemplate {
    return new ResumeTemplate(this.name, this.factory, [...this.sections], {
      ...this.styles,
    });
  }
}

class TemplateRegistry {
  private templates = new Map<string, ResumeTemplate>();

  register(name: string, template: ResumeTemplate): Void {
    this.templates.set(name, template);
  }

  create(name: string): ResumeTemplate {
    const template = this.templates.get(name);

    if (!template) throw new Error(`Unkonw Template: ${name}`);

    return template.clone();
  }
}
