interface Cloneable<T> {
  clone(): T;
}

class DocumentTemplate implements Cloneable<DocumentTemplate> {
  constructor(
    public title: string,
    public section: Section[],
    public styles: StyleConfig,
    public metadata: Record<string, string>,
  ) {}

  clone(): DocumentTemplate {
    return new DocumentTemplate(
      this.title,
      this.section.map((s) => s.clone()),
      { ...this.styles },
      { ...this.metadata },
    );
  }
}

class Section implements Cloneable<Section> {
  constructor(
    public heading: string,
    public content: string,
    public subsections: Section[],
  ) {}

  clone(): Section {
    return new Section(
      this.heading,
      this.content,
      this.subsections.map((s) => s.clone()),
    );
  }
}

interface StyleConfig {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  spacing: number;
}

const reportTemplate = new DocumentTemplate(
  'Quartely Report',
  [
    new Section('Extension Summary', '', []),
    new Section('finacial Overview', '', [
      new Section('REvenue', '', []),
      new Section('Expenses', '', []),
    ]),
    new Section('Conclusion', '', []),
  ],
  { fontFamily: 'Arial', fontSize: 12, primaryColor: '#333', spacing: 1.5 },
  { author: '', department: '', quarter: '' },
);

const q3Report = reportTemplate.clone();
q3Report.title = 'QE 2024 Reprot';
q3Report.metadata.author = 'Rahul';
