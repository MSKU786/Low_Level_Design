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
