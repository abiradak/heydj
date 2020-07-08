import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-djmainhome',
  templateUrl: './djmainhome.page.html',
  styleUrls: ['./djmainhome.page.scss'],
})
export class DjmainhomePage {
  djProfile: any;
  image: any;

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router
  ) {
   }
  ionViewWillEnter(){
    this.getUserInfo();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.router.navigate(['mainhome']);
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }

  async getUserInfo() {
    // this.helper.presentLoading();
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
      'get').subscribe((success: any) => {
        console.log('get api result >>>>>>>>>', success);
        // this.helper.hideLoading();
        this.djProfile = success;
        this.image = success.profileImage;
        // this.helper.hideLoading();
      }, err => {
        this.helper.presentToast(err.error, 'danger');
        // this.helper.hideLoading();
      })
  }

  back() {
    this.helper.goBack();
  }
  process() {
    this.router.navigate(['editdjprofile']);
  }
}
