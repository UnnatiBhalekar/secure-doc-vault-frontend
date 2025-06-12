import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule   }  from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  }  from '@angular/material/input';
import { MatButtonModule }  from '@angular/material/button';
import { AuthService }      from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Attempting login for', this.username);
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login succeeded');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Login error:', err);
        alert('Login failed: ' + (err.status || err.message));
      }
    });
  }
}
