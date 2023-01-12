import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  // {
  //   path: 'user/dashboard',
  //   loadChildren: () =>
  //     import('../user/dashboard/dashboard.module').then(
  //       (m) => m.DashboardPageModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
