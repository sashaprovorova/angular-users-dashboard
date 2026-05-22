import { Component, OnInit, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-users-list',
  imports: [NzTableModule, FormsModule, NzInputModule, NzButtonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users: User[] = [];
  isLoading = false;
  errorMessage = '';
  searchInput = '';
  activeSearch = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  goToUserDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }

  goToCreateUser(): void {
    this.router.navigate(['/users/new']);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
      },
    });
  }

  get filteredUsers(): User[] {
    const search = this.activeSearch.trim().toLowerCase();

    if (!search) {
      return this.users;
    }

    return this.users.filter((user) => {
      return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
    });
  }

  applySearch(): void {
    this.activeSearch = this.searchInput;
  }

  resetSearch(): void {
    this.searchInput = '';
    this.activeSearch = '';
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
      },
    });
  }
}
