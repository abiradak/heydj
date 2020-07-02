import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-djmainhome',
  templateUrl: './djmainhome.page.html',
  styleUrls: ['./djmainhome.page.scss'],
})
export class DjmainhomePage implements OnInit {
  djProfile: any;
  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
      'get').subscribe((success: any) => {
        console.log('get api result >>>>>>>>>', success);
        this.djProfile = success;
        console.log(this.djProfile);
      }, err => {
        this.helper.presentToast(err.error, 'danger');
      })
  }

  process() {
    this.router.navigate(['editdjprofile']);
  }
  

}
