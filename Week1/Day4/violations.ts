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