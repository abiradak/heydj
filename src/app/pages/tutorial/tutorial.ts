import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
// import { SocialAuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service'; 
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';

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
    // private deeplinks: Deeplinks
  ) {}

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  // onSlideChangeStart(event) {
  //   event.target.isEnd().then(isEnd => {
  //     this.showSkip = !isEnd;
  //   });
  // }

  // ionViewWillEnter() {
  //   this.storage.get('ion_did_tutorial').then(res => {
  //     if (res === true) {
  //       this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
  //     }
  //   });

  //   this.menu.enable(false);
  // }

  // ionViewDidLeave() {
  //   this.menu.enable(true);
  // }

  

  signInWithGoogle(): void {
    // this.deeplinks.route({
    //   'https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/google': DjProfilePage
    //   // '/about-us': AboutPage,
    //   // '/universal-links-test': AboutPage,
    //   // '/products/:productId': ProductPage
    // }).subscribe(match => {
    //   // match.$route - the route we matched, which is the matched entry from the arguments to route()
    //   // match.$args - the args passed in the link
    //   // match.$link - the full link data
    //   console.log('Successfully matched route', match);
    // }, nomatch => {
    //   // nomatch.$link - the full link data
    //   console.error('Got a deeplink that didn\'t match', nomatch);
    // });
    window.open("https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/google", "_self");
  }
 
  signInWithFB(): void {
    window.open("https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/auth/facebook", "_self");
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
