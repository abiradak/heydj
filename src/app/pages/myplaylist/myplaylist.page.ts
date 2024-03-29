import { Component } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController } from '@ionic/angular';


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
    }, (error) => {

    });
  }

  async deletePlaylist(id) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancelbtn',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Delete',
          cssClass: 'deletebtn',
          handler: () => {
            this.helper.presentLoading();
            this.apiGenerate.sendHttpCallWithToken('', '/api/dj//playlist/' + id, 'delete').subscribe((response: any) => {
              console.log('delete res >>>>>>>>>' , response)
              this.helper.presentToast(response, 'success');
              this.helper.hideLoading();
              this.myPlaylist();
              this.getUserInfo();
            }, err => {
              console.log('errors' ,err);
              this.helper.presentToast(err.error , 'danger');
              this.helper.hideLoading();
              this.myPlaylist();
              this.getUserInfo();
            });
          }
        },
      ]
    });
    await alert.present();
  }
}
