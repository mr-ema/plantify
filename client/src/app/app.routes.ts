import { Routes } from '@angular/router';
import { TabsComponent } from '@components/tabs/tabs.component';
import { AuthGuard } from '@services/auth/permissions.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage)
  },

  {
    path: 'tabs',
    canActivate: [AuthGuard],
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'list',
        loadComponent: () => import('./pages/my-plants/list/list.page').then(m => m.ListPage)

      }
    ]
  },

  {
    path: 'plant-detail/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/plant-detail/plant-detail.page').then( m => m.PlantDetailPage)
  },

  {
    path: 'my-plants',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },

      {
        path: 'edit',
        loadComponent: () => import('./pages/my-plants/edit/edit.page').then(m => m.EditPage)
      },

      {
        path: 'add',
        loadComponent: () => import('./pages/my-plants/add/add.page').then(m => m.AddPage)
      },

      {
        path: 'list',
        loadComponent: () => import('./pages/my-plants/list/list.page').then(m => m.ListPage)
      },
    ]
  },

  /*****************
   * Error Routes  *
   *****************/
  {
    path: '**',
    loadComponent: () => import('./pages/error/404/not-found.page').then( m => m.NotFoundPage)
  }
];


