
interface Printable {
  print(doc: Document): void;
}

interface Scanable {
  scan(doc: Document): void;
}

interface Faxable {
  fax(doc: Document): void;
}

interface Stapleable {
  staple(doc: Document): void;
}

interface Collatable {
  collate(docs: Document[]): void;
}


class OfficePro implements Printable, Scanable, Faxable, Stapleable, Collatable {
  print(doc: Document): void {
    console.log('Printing document');
  }
  scan(doc: Document): void {
    console.log('Scanning document');
  }
  fax(doc: Document): void {
    console.log('Faxing document');
  }
  staple(doc: Document): void {
    console.log('Stapling document');
  }
  collate(docs: Document[]): void {
    console.log('Collating documents');
  }
}


class HomePrinter implements Printable, Scanable {
  print(doc: Document): void {
    console.log('Printing document');
  }
  scan(doc: Document): void {
    console.log('Scanning document');
  }
}

// ISP Applied: Will never call fax() on a HomePrinter, so it's not forced to implement it.
function sendFax(machine: Faxable, doc: Document): void { 
  machine.fax(doc);
}