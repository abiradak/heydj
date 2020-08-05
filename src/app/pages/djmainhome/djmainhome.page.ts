import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';



@Component({
  selector: 'app-djmainhome',
  templateUrl: './djmainhome.page.html',
  styleUrls: ['./djmainhome.page.scss'],
})
export class DjmainhomePage {

  djProfile: any;
  image: any;
  audioContent: any;
  videoContent: any;
  checkbox = false;
  contentArray: any[] = [];
  isGreen = false;

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
    public modalController: ModalController,
  ) {
   }

  ionViewWillEnter(){
    this.getUserInfo();
    this.getDjAllContent();
    this.getPlaylist();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.router.navigate(['mainhome']);
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }

  getUserInfo() {
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
      this.getUserInfo();
      // this.helper.hideLoading();
    })
  }

  async getDjAllContent(){
    this.apiGenerate.sendHttpCallWithToken('' , '/api/dj/content' , 'get').subscribe((success: any) => {
      if(success.contents.length > 0){
        this.audioContent = success.contents.filter( function(item) {
          return item.type == 'audio';
        })
        this.videoContent = success.contents.filter( function(item) {
          return item.type == 'video';
        })
      } else {
        this.helper.presentToast('You Dont Have Any Content' , 'warning');
      }
      console.log('getting contents >>>>>>>>>' , this.videoContent);
    })
  }

  async playMusic(audio) {
    localStorage.setItem('audioImage', audio.thumbnail);
    this.music.playAudio(audio.content);
    // const url = audio.content.split('.com/');
    // const finalUrl = url[1].split('?');
    // let sendData = {
    //   'key': finalUrl[0]
    // }
    // this.apiGenerate.sendHttpCall(sendData , '/api/content/url' , 'post').subscribe((success) => {
    //   this.music.playAudio(success.url);
    // })
  }

  async playVideo(video){
    localStorage.setItem('videoImage', video.thumbnail);
    this.music.PlayVideo(video.content);
    // const url = video.content.split('.com/');
    // const finalUrl = url[1].split('?');
    // let sendData = {
    //   'key': finalUrl[0]
    // }
    // this.apiGenerate.sendHttpCall(sendData , '/api/content/url' , 'post').subscribe((success) => {
    //   this.music.PlayVideo(success.url);
    // })
  }

  async deleteCotent(id) {
    this.presentAlertPrompt(id);
  }


  async presentAlertPrompt(id) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
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
            this.apiGenerate.sendHttpCallWithToken('', '/api/dj/content/' + id, 'delete').subscribe((response: any) => {
              this.helper.presentToast( response, 'success');
              this.helper.hideLoading();
            }, err => {
              console.log(err.error);
              this.helper.presentToast(err.error , 'danger');
              this.helper.hideLoading();
            });
          }
        },
      ]
    });
    await alert.present();
  }

  async songs(id) {
    this.contentArray.push(id);
    console.log('songs array >>>>>' , this.contentArray);
  }
 
  async addPlaylist() {
    this.checkbox = true;
  }
  async playList() {
    this.router.navigate(['create-playlist', this.contentArray]);
  }

  back() {
    this.helper.goBack();
  }
  process() {
    this.router.navigate(['editdjprofile']);
  }

  async getPlaylist() {
    
  }
}
