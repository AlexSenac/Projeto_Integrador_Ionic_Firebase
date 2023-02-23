import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToTab1 = () => redirectLoggedInTo(['perfil','register']);
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginPageModule),
        ...canActivate(redirectLoggedInToTab1),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('../tab1/contact-details/contact-details.module').then(
            (m) => m.ContactDetailsPageModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
