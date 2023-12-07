import { Routes } from '@angular/router';
import { TabsComponent } from '@components/tabs/tabs.component';
import { AuthGuard } from '@services/auth/permissions.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
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
        path: 'bookmark',
        loadComponent: () => import('./pages/bookmark/bookmark.page').then(m => m.BookmarkPage)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.page').then(m => m.SearchPage)
      }
    ]
  },

  {
    path: 'plant-detail/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/plant-detail/plant-detail.page').then(m => m.PlantDetailPage)
  },

  /*****************
   * Error Routes  *
   *****************/
  {
    path: '**',
    loadComponent: () => import('./pages/error/404/not-found.page').then(m => m.NotFoundPage)
  },
];


