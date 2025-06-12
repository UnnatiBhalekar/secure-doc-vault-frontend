// src/app/pages/upload/upload.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,            // ← add this
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class Upload {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  docId: string | null = null;

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
    private router: Router    // ← inject the Router
  ) {}

  onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
    this.uploadProgress = null;
    this.docId = null;
  }

  upload() {
    if (!this.selectedFile) {
      console.warn('No file selected');
      return;
    }

    this.uploadService.uploadFile(this.selectedFile).subscribe(evt => {
      console.debug('Upload event:', evt);
      this.uploadProgress = evt.progress;

      if (evt.docId) {
        this.docId = evt.docId;
        console.debug('Document ID received:', this.docId);

        // Show a quick snackbar
        this.snackBar.open(
          `Upload complete! Document ID: ${this.docId}`,
          'Close',
          { duration: 3000 }
        );

        // Redirect to Dashboard to see the new file
        this.router.navigate(['/dashboard']);
      }
    }, err => {
      console.error('Upload error', err);
    });
  }
}
