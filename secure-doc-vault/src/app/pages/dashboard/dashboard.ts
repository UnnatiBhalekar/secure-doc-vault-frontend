import { Component, OnInit }       from '@angular/core';
import { CommonModule }             from '@angular/common';
import { MatTableModule }           from '@angular/material/table';
import { MatButtonModule }          from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule }             from '@angular/router';

import { DocumentService, Document } from '../../services/document.service';
import { saveAs }                     from 'file-saver';
import { Observable }                 from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  displayedColumns = ['filename','uploadedAt','status','actions'];
  dataSource: Document[] = [];

  constructor(
    private docSvc: DocumentService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.docSvc.list().subscribe({
      next: docs    => this.dataSource = docs,
      error: ()     => this.snack.open('Failed to load documents','Close',{duration:3000})
    });
  }

  download(doc: Document) {
    this.docSvc.downloadRedacted(doc.docId).subscribe({
      next: blob => saveAs(blob, `redacted-${doc.docId}.txt`),
      error: ()  => this.snack.open('Download failed','Close',{duration:3000})
    });
  }
}
