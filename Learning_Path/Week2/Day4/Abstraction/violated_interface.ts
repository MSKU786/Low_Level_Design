interface DataImporter {
  import(sources: string): Promise<ImportResult>
}


class CSVImporter implements DataImporter {

  async import(sources: unknown): Promise<ImportResult> {
    const raw =  fs.readFile(sources, "utf-8");

     // Validate Duplicate
    if (!raw || !raw.trim().length === 0) {
      throw new Error("Empty Data");
    }

    // Transform CSV
    const rows = raw.split("\n");

    // Save - Duplicated in every importer
    await db.insert(data);
    return {success: true, recordCount: data.records.length};
  }
}


class APIImporter implements DataImporter {
  async import(sources: string): Promise<ImportResult> {
    
    const res = await fetch(sources);
    const raw = await res.text();

      // Validate Duplicate
    if (!raw || !raw.trim().length === 0) {
      throw new Error("Empty Data");
    }

    // Transform CSV
    const parsed = JSON.parse(raw);

    // Save - Duplicated in every importer
    await db.insert(parsed);
    return {success: true, recordCount: parsed.records.length};
  }
}

