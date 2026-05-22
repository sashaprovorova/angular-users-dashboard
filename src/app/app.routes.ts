import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetails } from './pages/user-details/user-details';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersList,
  },
  {
    path: 'users/new',
    component: UserForm,
  },
  {
    path: 'users/:id',
    component: UserDetails,
  },
  {
    path: 'users/:id/edit',
    component: UserForm,
  },
];
