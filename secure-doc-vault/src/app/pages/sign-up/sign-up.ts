import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {
  // email: string = '';
  // password: string = '';
  // name: string = '';

  // constructor(private router: Router, private auth: AuthService) {}

  // // onSubmit(formValue: any) {
  // //   this.auth.signup(formValue).subscribe(() => {
  // //     this.router.navigate(['/dashboard']);
  // //   });
  // // }
  // onSubmit() {
  //   this.auth.signup({ email: this.email, password: this.password, name: this.name }).subscribe(() => {
  //     this.router.navigate(['/dashboard']);
  //   });
  // }
}
