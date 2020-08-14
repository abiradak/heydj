import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service'; 
import { InAppBrowser , InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage implements OnInit{
  showSkip = true;
  // user: SocialUser;
  loggedIn: boolean;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    public modalController: ModalController,
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    public iab: InAppBrowser,
    private route: NavController
  ) {}

  ngOnInit() {
  }

  back() {
    this.helper.goBack();
  }
  

  signInWithGoogle(): void {
    let browser = this.iab.create('https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/google', '_self', 'location=yes');
    if (browser.on('loadstart').subscribe)
    browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
      console.log('loadstart >>>>>>>' , e);
      let successUrl = e.url.split('=');
      if (successUrl[0] === 'http://localhost:3000/login/success?state'){
        let token = successUrl[1].split('#');
        localStorage.setItem('token', JSON.stringify(token[0]));
        browser.close();
        let userInfo = this.getDecodedAccessToken(token[0]);
        console.log('user Info >>>>>>>' , userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        if(userInfo.role == 'dj') {
          localStorage.setItem('dj' , userInfo.role);
          this.route.navigateRoot(['create-portfolio']);
        } else {
          this.route.navigateRoot(['mainhome']);
        }
        this.helper.presentToast('Login Successfull', 'success');
      }
    });
  }
 
  signInWithFB(): void {
    let browser = this.iab.create('https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/facebook', '_self', 'location=yes');
    if (browser.on('loadstart').subscribe)
      browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
        console.log('loadstart >>>>>>>' , e);
        let successUrl = e.url.split('=');
        if (successUrl[0] === 'http://localhost:3000/login/success?state'){
          let token = successUrl[1].split('#');
          localStorage.setItem('token', JSON.stringify(token[0]));
          browser.close();

          let userInfo = this.getDecodedAccessToken(token[0]);
          console.log('user Info >>>>>>>' , userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          if(userInfo.role == 'dj') {
            localStorage.setItem('dj' , userInfo.role);
            this.router.navigate(['create-portfolio']);
          } else {
            this.router.navigate(['mainhome']);
          }
          this.helper.presentToast('Login Successfull', 'success');
        }
      });
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  loginWithOtp() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'des'
    });
    return await modal.present();
  }
}
