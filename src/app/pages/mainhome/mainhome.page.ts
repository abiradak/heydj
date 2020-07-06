import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';


@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})

export class MainhomePage  {
  text: string;
  songslist: any;
  pausebutton: boolean;
  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
  ) { }

  // ngOnInit() {
  //   this.logoText();
  //   // this.getUserInfo();
  //   this.getMusicContents();
  // }

  ionViewWillEnter() {
    this.logoText();
    // this.getUserInfo();
    this.getMusicContents();
  }

  // getUserInfo() {
  //   let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   console.log(userInfo);
  //    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
  //    'get').subscribe((success: any) => {
  //      // console.log('get api result >>>>>>>>>' , success);
  //   //   this.updateProfile.patchValue({
  //   //     phone: userInfo.phoneNumber.slice(2,12),
  //   //     cuntrycode: 91,
  //   //     fname: success.firstName,
  //   //     lname: success.lastName,
  //   //     email: success.emailId,
  //   //     city: success.city
  //   //   });
  //    } , err => {
  //      this.helper.presentToast(err.error, 'danger');
  //    })
  // }

  getMusicContents(){
    this.apiGenerate.sendHttpCall('', `/api/playlist?all=true`,
    'get').subscribe((response) => {
      console.log('music list>>>>>>>>', response.body.playlists);
      this.songslist = response.body.playlists;
    }, error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  playMusic(url , mp3){
    this.music.play(url , mp3);
    this.pausebutton = true;
  }

  stopMusic() {

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
    localStorage.removeItem('userInfo');
    this.logoText();
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }
}
