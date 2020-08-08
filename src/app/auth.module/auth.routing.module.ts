import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login/:username',
        loadChildren: () => import('./modules/login-page/login-page.module').then(m => m.LoginPageModule)
      }, {
        path: 'login',
        loadChildren: () => import('./modules/login-page/login-page.module').then(m => m.LoginPageModule)
      }, {
        path: 'register',
        loadChildren: () => import('./modules/register-page/register-page.module').then(m => m.RegisterPageModule)
      }, {
        path: 'registerpendingverify',
        loadChildren: () => import('./modules/register-pending-verify-page/register-pending-verify-page.module').then(m => m.RegisterPendingVerifyPageModule)
      }, {
        path: 'registerpendingverify/:name/:email',
        loadChildren: () => import('./modules/register-pending-verify-page/register-pending-verify-page.module').then(m => m.RegisterPendingVerifyPageModule)
      }, {
        path: 'registerverified',
        loadChildren: () => import('./modules/register-email-verified-page/register-email-verified-page.module').then(m => m.RegisterEmailVerifiedPageModule)
      }, {
        path: 'forgotpassword',
        loadChildren: () => import('./modules/forgot-password-page/forgot-password-page.module').then(m => m.ForgotPasswordPageModule)
      }, {
        path: 'resetpendingverify/:email',
        loadChildren: () => import('./modules/reset-password-pending-verify-page/reset-password-pending-verify-page.module').then(m => m.ResetPasswordPendingVerifyPageModule)
      }, {
        path: 'resetpassword',
        loadChildren: () => import('./modules/reset-password-page/reset-password-page.module').then(m => m.ResetPasswordPageModule)
      }, {
        path: 'resetpasswordverified/:email',
        loadChildren: () => import('./modules/reset-password-verified-page/reset-password-verified-page.module').then(m => m.ResetPasswordVerifiedPageModule)
      }, {
        path: 'logout',
        loadChildren: () => import('./modules/logout/logout.module').then(m => m.LogoutModule)
      }
    ]
  }
];
export const AuthRoutingModule = RouterModule.forChild(routes);
