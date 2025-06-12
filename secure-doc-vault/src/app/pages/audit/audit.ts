import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

interface AuditEntry {
  timestamp: string;
  action: string;
  user: string;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './audit.html',
  styleUrl: './audit.scss'
})
export class Audit implements OnInit {
  columns = ['timestamp','action','user'];
  data: AuditEntry[] = [];

  ngOnInit() {
    // TODO: fetch audit log
    this.data = [ { timestamp: '2025-06-10T18:00', action: 'Uploaded', user: 'alice' } ];
  }
}
