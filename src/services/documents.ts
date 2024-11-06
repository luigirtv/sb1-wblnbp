import { Document } from '../types';

class DocumentService {
  private documents: Document[] = [];

  async uploadDocument(file: File, metadata: any): Promise<Document> {
    // In a real application, this would handle file upload to a storage service
    const newDocument: Document = {
      id: crypto.randomUUID(),
      title: metadata.title,
      description: metadata.description,
      type: 'other',
      category: metadata.category,
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadedBy: 'currentUser', // Would come from auth context
      uploadedAt: new Date(),
      lastModified: new Date(),
      permissions: {
        view: ['currentUser'],
        edit: ['currentUser']
      },
      tags: metadata.tags.split(',').map((tag: string) => tag.trim()),
      status: 'active',
      version: 1
    };

    this.documents.push(newDocument);
    return newDocument;
  }

  async getDocuments(): Promise<Document[]> {
    return this.documents;
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.find(doc => doc.id === id);
  }

  async deleteDocument(id: string): Promise<void> {
    this.documents = this.documents.filter(doc => doc.id !== id);
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) throw new Error('Document not found');

    const updatedDocument = {
      ...this.documents[index],
      ...updates,
      lastModified: new Date()
    };

    this.documents[index] = updatedDocument;
    return updatedDocument;
  }
}

export const documentService = new DocumentService();