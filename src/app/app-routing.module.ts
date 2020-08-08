import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadScriptResolver } from './shared/services/preload-script-resolver.service';

// App fall-back and test routes..
const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth.module/auth.module').then(m => m.AuthModule),
    resolve: {
      preloadScripts: PreloadScriptResolver
    },
    data: {
      preloadScripts: [{ name: 'bootstrap.min.css', type: 'css' }]
    }
  }, {
    path: 'main',
    loadChildren: () => import('./backend-main.module/backend-main.module').then(m => m.BackendMainModule),
    resolve: { preloadAllScripts: PreloadScriptResolver },
    data: {
      preloadAllScripts: true
    }
  }, {
    path: 'ping',
    loadChildren: () => import('./shared/modules/ping-test/ping-test.module').then(m => m.PingTestModule)
  }, {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./shared/modules/not-found/not-found.module').then(m => m.NotFoundModule),
    resolve: {
      preloadScripts: PreloadScriptResolver
    },
    data: {
      preloadScripts: [
        { name: 'animate.min.css', type: 'css' },
        // {name: 'bootstrap.min.css', type: 'css'},
        // {name: 'styles.css', type: 'css'},
        // {name: 'font-awesome.min.css', type: 'css'},
        // {name: 'theme.css', type: 'css'},
        // {name: 'lyt2-theme-1.css', type: 'css'},
        // {name: 'primeng.min.css', type: 'css'},
        // {name: 'primeicons.css', type: 'css'}
      ]
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
