import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listerner-profile',
  templateUrl: './listerner-profile.page.html',
  styleUrls: ['./listerner-profile.page.scss'],
})
export class ListernerProfilePage implements OnInit {
  userProfile: any;
  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    public router: Router
  ) { }


  newuserProfile() {
    this.router.navigate(['createlistenrerprofile']);
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
      'get').subscribe((success: any) => {
        console.log('get api result >>>>>>>>>', success);
          this.userProfile = success;
          console.log(this.userProfile);
      }, err => {
        this.helper.presentToast(err.error, 'danger');
      })
  }

  editMenu(userProfile) {
    console.log(userProfile);
  }
  ngOnInit() {
    this.getUserInfo();
  }

}
