import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';


const appRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userAccount',
    component: UserAccountComponent
  },
  {
    path: 'userEdit/:id',
    component: UserEditComponent
  },
  {
    path: 'addUser',
    component: UserAddComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
