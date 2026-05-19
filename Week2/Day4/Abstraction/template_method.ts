abstract class DataImporter {
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


  protected abstract read(sources: string): Promise<string>;
  protected abstract trasform(data: ValidateData): ProcessedDate;

  protected validate(raw: string): ValidateData {
    if (!raw || !raw.trim().length === 0) {
      throw new Error("Empty Data");
    }
    
    return { content: raw, validatedAt: new Date()};
  }


  protected async save() {
    await db.insert(data);
    return {success: true, recordCount: data.records.length};
  }
}


// Subclass only fill in the holes

class CSVImporter extends DataImporter {
  protected async read(sources: string): Promise<string> {
    return fs.readFile(sources, "utf-8");
  }

  protected async trasform(data: ValidateData) {
    const rows = data.content.split("\n");
    return {records: rows};
  }
}



class APIImporter extends DataImporter {
  protected async read(sources: string): Promise<string> {
    const res = await fetch(sources);
    return res.text();
  }

  protected async trasform(data: ValidateData) {
    const parsed = JSON.parse(data);
    return parsed;
  }
}