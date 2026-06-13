// Split by capablity - 

interface Machine {
  print(doc: Document): void;
  scan(doc: Document): void;
  fax(doc: Document): void;
  staple(doc: Document): void;
  collate(docs: Document[]): void;
}


// Premium Printer: 
class OfficePro implements Machine {
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


class HomePrinter implements Machine {
  print(doc: Document): void {
    console.log('Printing document');
  }
  scan(doc: Document): void {
    console.log('Scanning document');
  }
  fax(doc: Document): void {
    throw new Error('Faxing not supported');
  }
  staple(doc: Document): void {
   throw new Error('Stapling not supported');
  }

  collate(docs: Document[]): void {
    throw new Error('Collating not supported');
  }
}


function sendFax(machine: Machine, doc: Document): void {
  machine.fax(doc);
}