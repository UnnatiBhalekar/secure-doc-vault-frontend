import { Component, OnInit }               from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { MatButtonModule }                  from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar }   from '@angular/material/snack-bar';
import { ActivatedRoute }                   from '@angular/router';
import { DocumentService, Document }    from '../../services/document.service';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.scss']
})
export class DocumentDetail implements OnInit {
  docId!: string;
  doc: Document | null = null;

  constructor(
    private route: ActivatedRoute,
    private svc:   DocumentService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    // pull the :docId from the URL
    this.docId = this.route.snapshot.paramMap.get('docId')!;
    this.load();
  }

  private load() {
    this.svc.detail(this.docId).subscribe({
      next: d => this.doc = d,
      error: () => this.snack.open('Failed to load document','Close',{duration:3000})
    });
  }

  process() {
    this.svc.process(this.docId).subscribe({
      next: () => {
        this.snack.open('Redaction started','Close',{duration:3000});
        this.load(); // reload status when done
      },
      error: () => this.snack.open('Redaction failed','Close',{duration:3000})
    });
  }

  download() {
    this.svc.downloadRedacted(this.docId).subscribe({
      next: blob => {
        import('file-saver').then(fs => fs.saveAs(blob, `redacted-${this.docId}.txt`));
      },
      error: () => this.snack.open('Download failed','Close',{duration:3000})
    });
  }
}
