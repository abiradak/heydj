import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { HelperService } from './helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  selectedPage: any;
  pages: Array<{ title: string; component: any }>;
  
  loggedIn = false;
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
    private network: Network,
    private helper: HelperService
  ) {
    this.sideMenu();
    this.initializeApp();
  }
  
  // ionViewWillEnter() {
  //   this.sideMenu();
  // }

  ionViewWillEnter() {
    this.sideMenu();
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
    console.log('calling');
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
          title: 'Add Content',
          url: '/create-djprofile',
          icon: 'map'
        },
        {
          title: 'My Playlist',
          url: '/myplaylist',
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
          title: 'Earnings',
          url: '/profit',
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

  // checkConnection() {
  //   this.network.onDisconnect().subscribe(() => {
  //     this.helper.presentToast('No Internet!' , 'danger')
  //   });
  // }

  checkLoginStatus() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      return true;
    } else {
      return false;
      // this.router.navigate(['mainhome']);
    }
  }

  async login() {
    this.router.navigate(['tutorial']);
  }

  async logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    let isDj = localStorage.getItem('dj');
    if(isDj == 'dj') {
      localStorage.removeItem('dj');
      this.router.navigate(['mainhome']);
    }
    this.sideMenu();
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }
}
