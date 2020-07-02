import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dj-profile',
  templateUrl: './dj-profile.page.html',
  styleUrls: ['./dj-profile.page.scss'],
})
export class DjProfilePage implements OnInit {
  djProfile: any;
  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router:Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

 async getUserInfo() {
    const loading = await this.loadingCtrl.create({
      backdropDismiss: true
    });
    loading.present();
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
      'get').subscribe((success: any) => {
        console.log('get api result >>>>>>>>>', success);
        this.djProfile = success;
        console.log(this.djProfile);
        loading.dismiss();
      }, err => {
        this.helper.presentToast(err.error, 'danger');
        loading.dismiss();
      })
  }


  editDJProfile(djProfile) {
    const navigationExtras: NavigationExtras = {
      state: {
        Profiledetails: djProfile
      }
    };
    this.router.navigate(['editdjprofile'], navigationExtras);
  }
}
