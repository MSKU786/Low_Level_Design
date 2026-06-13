interface Importer {
  import(sources: string): Promise<ImportResult>
}


// Shared base - implements the interface, provides template method
abstract class BaseImporter implements Importer {
  async import(sources: string): Promise<ImportResult> {
    // Step1 : Read the sources(varies by source type)
    const raw = await this.read(sources);

    // Validate the sources shared logic same for all
    const validated = await this.validate(raw);

    // Transfom (varies by dat format) 
    const transformed = await this.transform(validated);

    // Save in db (Same for all)
    return this.save(transformed);
  }

  protected abstract read(source: string): Promise<string>;
  protected abstract transform(data: ValidatedData): ProcessedData;
  protected validate(raw: string): ValidatedData {}
  protected async save(data: ProcessedData): Promise<ImportResult>{};
}

class CSVImporter extends BaseImporter {
  /* read and transform */ 
}

class APIImporter extends BaseImporter {
  /* read and transform */
}

// Custom importer (if someone builds a totally custom importer)
class StreamImporter implements Importer {
  async import(source: string): Promise<ImportResult>{}
}