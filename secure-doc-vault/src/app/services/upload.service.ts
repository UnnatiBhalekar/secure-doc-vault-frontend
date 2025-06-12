import { HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{ progress: number; docId?: string }> {
    const form = new FormData();
    form.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, form, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request<string>(req).pipe(
      filter((evt: HttpEvent<string>) =>
        evt.type === HttpEventType.UploadProgress ||
        evt.type === HttpEventType.Response
      ),
      map(evt => {
        if (evt.type === HttpEventType.UploadProgress) {
          const percent = Math.round((evt.loaded / (evt.total ?? 1)) * 100);
          return { progress: percent };
        } else if (evt.type === HttpEventType.Response) {
          // Here evt is HttpResponse<string>
          const httpResponse = evt as HttpResponse<string>;
          return { progress: 100, docId: httpResponse.body ?? '' };
        }
        // Should never reach here because of filter
        return { progress: 0 };
      })
    );
  }
}
