import { Component } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { NgZone  } from '@angular/core';



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
  isTicked: boolean = false;
  tickedItem: any;

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    private appComponent: AppComponent,
    private ngZone: NgZone ,
    private navCtrl: NavController
  ) { }

  ionViewWillEnter() {
    this.appComponent.sideMenu();
    this.getDjAllContent();
  }

  refresh() {
    this.ngZone.run(() => {
      console.log('force update the screen');
    });
  }
  getUserInfo() {
    console.log('entering >>>>>>>>>>');
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
      console.log('dj errb >>>>>' , err);
      this.helper.presentToast(err.error, 'danger');
    })
  }

  async getDjAllContent(){
    this.apiGenerate.sendHttpCallWithToken('' , '/api/dj/content' , 'get').subscribe((success: any) => {
      if(success.contents && success.contents.length > 0){
        this.audioContent = success.contents.filter( function(item) {
          return item.type == 'audio';
        })
        this.videoContent = success.contents.filter( function(item) {
          return item.type == 'video';
        })
      } else {
        this.helper.presentToast('You Dont Have Any Content' , 'warning');
      }
      this.getUserInfo();
      console.log('getting contents >>>>>>>>>' , this.videoContent);
    } , (error) => {
      this.refresh();
      console.log('error coming >>>>>>>' , error);
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
    this.isTicked = true;
    this.contentArray.push(id);
    console.log('songs array >>>>>' , this.contentArray);
  }

  async deleteSongs(id) {
    let position  = this.contentArray.indexOf(id);
    this.contentArray.splice(position , 1);
    // this.isTicked = false;

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
}
