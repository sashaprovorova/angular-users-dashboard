import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzCardModule, NzFormModule, NzInputModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  userId: number | null = null;

  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    website: ['', Validators.required],
  });

  ngOnInit(): void {
    this.checkEditMode();
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEditMode = true;
    this.userId = Number(id);

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.form.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
        });
      },
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const userPayload: User = {
      id: this.userId ?? 0,
      name: formValue.name,
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone,
      website: formValue.website,
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userPayload).subscribe(() => {
        this.router.navigate(['/users']);
      });
      return;
    }

    this.userService.createUser(userPayload).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
