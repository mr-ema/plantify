import { Routes } from '@angular/router';
import { TabsComponent } from '@components/tabs/tabs.component';

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
    path: 'plant-detail/:id',
    loadComponent: () => import('./pages/plant-detail/plant-detail.page').then( m => m.PlantDetailPage)
  },

  {
    path: 'tabs',
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
    path: 'my-plants',
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
];
