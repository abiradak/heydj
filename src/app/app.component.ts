import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  selectedPage: any;
  pages: Array<{ title: string; component: any }>;
  
  loggedIn = false;
  // dark = false;
  nav: any;
  token: string;
  isLoggedIn: boolean;
  isdj: any;
  appPages: { title: string; url: string; icon: string; }[];

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  async ngOnInit() {
    
    //this.listenForLoginEvents();
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

  isDj() {
    this.isdj = localStorage.getItem('dj');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.checkLoginStatus();
      this.splashScreen.hide();
    });
  }

  sideMenu(){
    const isdj = localStorage.getItem('dj');
    if(isdj == 'dj') {
      this.appPages = [
        {
          title: 'Dashboard',
          url: 'mainhome',
          icon: 'home'
        },
        {
          title: 'Profile',
          url: '/editdjprofile',
          icon: 'people-circle',
        },
        {
          title: 'My Dj',
          url: '/djmainhome',
          icon: 'map'
        },
        {
          title: 'Create Dj',
          url: '/create-djprofile',
          icon: 'map'
        },
        {
          title: 'Portfolio',
          url: '/create-portfolio',
          icon: 'home'
        },
        {
          title: 'Messages',
          url: '/mainhome',
          icon: 'information-circle'
        },
        {
          title: 'Subcription',
          url: '/mainhome',
          icon: 'information-circle'
        },
      ]  
    } else {
      this.appPages = [
        {
          title: 'Profile',
          url: '/createlistenrerprofile',
          icon: 'people-circle',
        },
        {
          title: 'Playlist',
          url: '/userdashboard',
          icon: 'map'
        },
        {
          title: 'Messages',
          url: '/mainhome',
          icon: 'information-circle'
        },
        {
          title: 'Subcription',
          url: '/mainhome',
          icon: 'information-circle'
        },
      ]  
    }
  }

  checkLoginStatus() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLoggedIn = true;
    } else {
       this.isLoggedIn = false;
       this.router.navigate(['mainhome']);
    }
  }

  // openTutorial() {
  //   this.menu.enable(false);
  //   this.storage.set('ion_did_tutorial', false);
  //   this.router.navigateByUrl('/tutorial');
  // }
}
