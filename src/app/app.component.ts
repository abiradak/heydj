import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  selectedPage: any;
  pages: Array<{ title: string; component: any }>;
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/tabs/schedule',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/dj-profile',
      icon: 'people-circle',
    },
    {
      title: 'Playlist',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'Messages',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Subcription',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Account',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Support',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;
  nav: any;
  token: string;
  isLoggedIn: boolean;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.checkLoginStatus();
      this.splashScreen.hide();
    });
  }

  // checkLoginStatus() {
  //   return this.userData.isLoggedIn().then(loggedIn => {
  //     return this.updateLoggedInStatus(loggedIn);
  //   });
  // }

  // updateLoggedInStatus(loggedIn: boolean) {
  //   setTimeout(() => {
  //     this.loggedIn = loggedIn;
  //   }, 300);
  // }

  listenForLoginEvents() {
    // window.addEventListener('user:login', () => {
    //   this.updateLoggedInStatus(true);
    // });

    // window.addEventListener('user:signup', () => {
    //   this.updateLoggedInStatus(true);
    // });

    // window.addEventListener('user:logout', () => {
    //   this.updateLoggedInStatus(false);
    // });
  }

  // openSub(page) {
  //   if (this.selectedPage === page) {
  //     this.selectedPage = '';
  //   } else {
  //     this.selectedPage = page;
  //   }
  // }

  profile(page) {
    console.log(page);
    this.router.navigate(['createlistenrerprofile']);
  }

  profileOther(page) {
    console.log(page);
    this.router.navigate(['dj-profile']);
  }


  // logout() {
  //   this.userData.logout().then(() => {
  //     return this.router.navigateByUrl('/app/tabs/schedule');
  //   });
  // }
  checkLoginStatus() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLoggedIn = true;
    } else {
       this.isLoggedIn = false;
       this.router.navigate(['mainhome']);
    }
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
