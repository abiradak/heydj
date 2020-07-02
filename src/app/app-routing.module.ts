import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
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
  {
    path: 'account', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    
  },
  {
    path: 'support', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  // },
  // {
  //   path: 'app',
  //   loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  // },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
  },
  {
    path: 'listerner-profile', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/listerner-profile/listerner-profile.module').then(m => m.ListernerProfilePageModule)
  },
  {
    path: 'dj-dashboard', canActivate: [ActiveGuardService],
    loadChildren: () => import('./pages/dj-profile/dj-profile.module').then(m => m.DjProfilePageModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
