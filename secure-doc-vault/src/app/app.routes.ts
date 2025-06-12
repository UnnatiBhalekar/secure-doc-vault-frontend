// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page';
import { SignUp }               from './pages/sign-up/sign-up';
import { Login }                from './pages/login/login';
import { Profile }              from './pages/profile/profile';
import { Dashboard }            from './pages/dashboard/dashboard';
import { DocumentDetail }       from './pages/document-detail/document-detail';
import { Audit }                from './pages/audit/audit';
import { Upload }               from './pages/upload/upload';

import { AuthGuard }            from './services/auth.guard';

export const routes: Routes = [
  { path: '',                  component: LandingPageComponent },
  { path: 'signup',            component: SignUp },
  { path: 'login',             component: Login },
  { path: 'dashboard',         canActivate: [AuthGuard], component: Dashboard },
  { path: 'upload',            canActivate: [AuthGuard], component: Upload },
  { path: 'audit',             canActivate: [AuthGuard], component: Audit },
  { path: 'profile',           canActivate: [AuthGuard], component: Profile },
  { path: 'documents/:docId',  canActivate: [AuthGuard], component: DocumentDetail },
  { path: '**',                redirectTo: '' }
];
