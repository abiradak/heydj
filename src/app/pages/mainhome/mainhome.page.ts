import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {
  text: string;
  constructor(
    private router : Router,
    public helper: HelperService,
  ) { }

  ngOnInit() {
    this.logoText();
    this.getUserInfo();
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    // this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
    // 'get').subscribe((success: any) => {
    //   console.log('get api result >>>>>>>>>' , success);
    //   this.updateProfile.patchValue({
    //     phone: userInfo.phoneNumber.slice(2,12),
    //     cuntrycode: 91,
    //     fname: success.firstName,
    //     lname: success.lastName,
    //     email: success.emailId,
    //     city: success.city
    //   });
    // } , err => {
    //   this.helper.presentToast(err.error, 'danger');
    // })
  }

  logoText() {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token) {
      this.text = 'Logout';
    } else {
      this.text = 'Login';
    }
  }

  process(){
    this.router.navigate(['tutorial']);
  }

  logout(){
    localStorage.removeItem('token');
    this.logoText();
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }
}
