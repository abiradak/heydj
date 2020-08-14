import { Component } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.page.html',
  styleUrls: ['./myplaylist.page.scss'],
})
export class MyplaylistPage  {
  playlist: any;
  djProfile: any;
  image: any;
  checkbox: false;

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
    private alertCtrl: AlertController,
    public modalController: ModalController,
  ) { }

  ionViewWillEnter() {
    this.myPlaylist();
    this.getUserInfo();
  }

  getUserInfo() {
    console.log('entering >>>>>>>>>>');
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
    'get').subscribe((success: any) => {
      console.log('get api result >>>>>>>>>', success);
      this.djProfile = success;
      this.image = success.profileImage;
    }, err => {
      console.log('dj errb >>>>>' , err);
      this.helper.presentToast(err.error, 'danger');
    })
  }

  async myPlaylist() {
    this.apiGenerate.sendHttpCallWithToken('', '/api/dj/playlist' ,'get').subscribe((success) => {
      console.log('getting plalist' , success);
      this.playlist = success.playlists;
      this.helper.presentAlert('Work In Progress(Code Done)' , 'warning')
    }, (error) => {

    });
  }
}
