// src/app/pages/landing-page/landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule  } from '@angular/material/button';
import { MatCardModule    } from '@angular/material/card';
import { RouterModule }     from '@angular/router';   

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl:  './landing-page.html',
  styleUrls:    ['./landing-page.scss'],
  host: {
    class: 'landing-page-container'
  }
})
export class LandingPageComponent {
  currentYear = new Date().getFullYear();
  features = [
    { title: 'Encrypted Storage',     description: 'All documents are encrypted at rest using AES-256.' },
    { title: 'Automated Redaction',   description: 'Detect and redact PII automatically with AWS Textract + Comprehend.' },
    { title: 'Audit Trail',           description: 'Maintain a verifiable audit trail of document uploads and views.' },
    { title: 'Role-Based Access',     description: 'Fine-grained access control with role-based permissions.' },
    { title: 'Scalable Architecture', description: 'Built on AWS, scales seamlessly with your needs.' },
    { title: 'Open Source',           description: 'Fully open source, self-hostable, and customizable.' }
  ];
}
