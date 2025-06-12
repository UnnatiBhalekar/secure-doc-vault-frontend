# secure-doc-vault-frontend
React/TypeScript client for Secure Document Vault

# Repository Contents
1. backend/ — Spring Boot service that exposes a JWT-secured REST API on port 8080:

- /api/auth — signup & login → returns JWT

- /api/documents — list, detail, upload, process, download-redacted

- DynamoDB for metadata, S3 for PDFs, Textract + Comprehend for PII redaction

2. frontend/ — Angular 20 SPA served on port 4200:

# Login & signup forms

1. Dashboard list of documents

2. Upload page (with progress bar + snackbars)

3. Detail page (redact / download buttons)

4. JWT stored in LocalStorage + Angular HTTP interceptor


# Frontend Setup
1. Prerequisites
- Node.js 18+ & npm

- Angular CLI 16+

2. Configuration
- In src/environments/environment.ts:
![Screenshot 2025-06-12 at 4 29 13 AM](https://github.com/user-attachments/assets/585ab280-557c-485a-8a63-1dae9a823cf5)


3. Install & Run
- cd frontend
- npm install
- ng serve
* Your SPA will launch on http://localhost:4200.

1. Key Files
- auth.service.ts > handles signup/login and stores JWT

- auth.interceptor.ts > automatically attaches Authorization: Bearer …

- auth.guard.ts > protects routes

- upload.service.ts > file-upload with progress events

- document.service.ts > CRUD calls for metadata + download/redact

- app.routes.ts > route definitions

2. Pages under src/app/pages/:

- landing-page

- login / sign-up

- dashboard — lists metadata table

- upload — file selector + progress

- document-detail — status / redact / download

# How It Works
1. User signs up / logs in → receives JWT

2. Upload → Angular posts file to Spring Boot → S3 → DynamoDB

3. Dashboard fetches metadata list from /api/documents

4. Detail view shows status; clicking Redact calls /process → Textract + Comprehend → S3 redacted text + metadata update

5. Download fetches .txt blob and invokes File-Saver to save to disk

# To Do / Future Improvements
1. Lock down document endpoints so only the owner can view their own docs

2. Switch to Lambda DSL in Spring Security (no more deprecated APIs)

3. Add pagination & sorting on the dashboard

4. Show live “processing” status (e.g. websockets or periodic polling)

5. Add file-type previews (PDF viewer)

6. Implement upload cancellation & retry

Feel free to fork, raise issues or send PR’s!
— Unnati Bhalekar / SecureDocVault
