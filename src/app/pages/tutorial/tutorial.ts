import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
 

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage implements OnInit{
  showSkip = true;
  user: SocialUser;
  loggedIn: boolean;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    public modalController: ModalController,
    private authService: SocialAuthService,
    // private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
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
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
