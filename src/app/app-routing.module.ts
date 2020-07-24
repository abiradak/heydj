import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuardService } from './active-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainhome',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'account', canActivate: [ActiveGuardService],
  //   loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    
  // },
  {
    path: 'support', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
  },
  {
    path: 'listerner-profile', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/listerner-profile/listerner-profile.module').then(m => m.ListernerProfilePageModule)
  },
  {
    path: 'createlistenrerprofile', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/createlistenrerprofile/createlistenrerprofile.module').then(m => m.CreatelistenrerprofilePageModule)
  },
  {
    path: 'create-djprofile', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/create-djprofile/create-djprofile.module').then( m => m.CreateDJprofilePageModule)
  },
  {
    path: 'modal', 
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'mainhome',
    loadChildren: () => import('./pages/mainhome/mainhome.module').then( m => m.MainhomePageModule)
  },
  {
    path: 'userdashboard', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/userdashboard/userdashboard.module').then( m => m.UserdashboardPageModule)
  },
  {
    path: 'editdjprofile', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/editdjprofile/editdjprofile.module').then( m => m.EditdjprofilePageModule)
  },
  {
    path: 'djmainhome', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/djmainhome/djmainhome.module').then( m => m.DjmainhomePageModule)
  },
  {
    path: 'create-playlist', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/create-playlist/create-playlist.module').then( m => m.CreatePlaylistPageModule)
  },
  {
    path: 'content-update/:id', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/content-update/content-update.module').then( m => m.ContentUpdatePageModule)
  },
  {
    path: 'feature/:id', 
    loadChildren: () => import('./pages/feature/feature.module').then( m => m.FeaturePageModule)
  },
  {
    path: 'playlist/:id', 
    loadChildren: () => import('./pages/playlist/playlist.module').then( m => m.PlaylistPageModule)
  },
  {
    path: 'genre:/id', 
    loadChildren: () => import('./pages/genre/genre.module').then( m => m.GenrePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
