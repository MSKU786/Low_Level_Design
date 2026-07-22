

interface DocumentService {
  read(docId: string): Promise<Document>;
  write(docId: string, content: string): Promise<void>;
  delete(docId: string): Promise<void>;
  share(docId: string, userId: string): Promise<void>;
}

interface User {
  id: string;
  role: "viewer" | "editor" | "admin"
}

class RealDocumentService implements DocumentService {
  async read(docId: string) {}
  async write(docId: string, content: string) {}
  async delete(docId: string) {}
  async share(docId: string, userId: string) {}
}



class SecureDocumentService implements DocumentService {
  constructor(
    private inner: DocumentService,
    private currentUser: User, 
  ) {}

  async read(docId: string): Promise<Document> {
    return this.inner.read(docId);
  }

  async write(docId: string, content: string): Promise<void> {
    if (this.currentUser.role === 'viewer') {
      throw new Error("Permission Denioend: viwer cannot edit")
    }
    return this.inner.write(docId, content);
  }

  async delete(docId: string): Promise<void> {
    if (this.currentUser.role !== admin) {
      throw new Error("Permission Denied! only admin can delete")
    }
    return this.inner.delete(docId);
  }

  async share(docId: string, userId: string): Promise<void> {
    if (this.currentUser.role === 'viewer') {
      throw new Error("Permission Denioend: viwer cannot share")
    }
    return this.inner.share(docId, userId);
}


const realService = new RealDocumentService();

const adminDocs = new SecureDocumentService(realService, {id: "1", role: "admin"});
await adminDocs.read("doc1");
await adminDocs.write("doc1", "....")
await adminDocs.delete("doc1");


const viewerDocs = new SecureDocumentService(RealDocumentService, {id: '2", role: "viewer'})
