abstract class DataImporter {
  import(sources: string): Promise<ImportResult> {
    // Step1 : Read the sources(varies by source type)
    const raw = await this.read(sources);

    // Validate the sources shared logic same for all
    const validated = await this.validate(raw);

    // Transfom (varies by dat format) 
    const transformed = await this.transform(validated);

    // Save in db (Same for all)
    return this.save(transformed);
  }
}