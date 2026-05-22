import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-details',
  imports: [NzButtonModule, NzCardModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  user: User | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUser();
  }

  goToEditUser(): void {
    if (!this.user) {
      return;
    }

    this.router.navigate(['/users', this.user.id, 'edit']);
  }

  private loadUser(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;

        this.isLoading = false;
      },

      error: () => {
        this.errorMessage = 'Failed to load user';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
