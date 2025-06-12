import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';

export interface Document {
  docId:     string;
  filename:  string;
  uploadedAt:string;
  status:    string;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {
  // point this at your *backend* API, not the Angular dev server
  private base = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  /** GET /api/documents */
  list(): Observable<Document[]> {
    return this.http.get<Document[]>(this.base);
  }

  /** GET /api/documents/:id */
  detail(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.base}/${id}`);
  }

  /** GET /api/documents/:id/download-redacted as blob */
  downloadRedacted(id: string): Observable<Blob> {
    return this.http.get(`${this.base}/${id}/download-redacted`, {
      responseType: 'blob',
      observe: 'body' as const
    });
  }

  /** POST /api/documents/:id/process */
  process(id: string): Observable<void> {
    return this.http.post<void>(`${this.base}/${id}/process`, {});
  }
}
