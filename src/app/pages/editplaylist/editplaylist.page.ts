import { Component } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-editplaylist',
  templateUrl: './editplaylist.page.html',
  styleUrls: ['./editplaylist.page.scss'],
})
export class EditplaylistPage {

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
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.checkbox = false;
    this.isTicked = false;
    this.getDjAllContent();
  }

  // refresh() {
  //   this.ngZone.run(() => {
  //     console.log('Hiii');
  //     this.getDjAllContent();
  //   });
  // }
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
  }
 
  async addPlaylist() {
    this.checkbox = true;
  }

  
  async playList() {
    const alert = await this.alertCtrl.create({
      header: 'Update PlayList',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Enter Title'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Enter Price'
        },
        {
          name: 'sampletype',
          type: 'text',
          placeholder: 'Enter Type(Only Audio or Video)'
        },
        
      ],
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
          text: 'Update',
          cssClass: 'deletebtn',
           handler: (data) => {
            if (data.sampletype && data.title && data.price) {
              const type = data.sampletype.toLowerCase();
              const id = this.route.snapshot.paramMap.get('id');
              const form = new FormData();
              form.append('title' , data.title);
              form.append('price' , data.price);
              form.append('content' , JSON.stringify(this.contentArray));
              this.helper.presentLoading();
              this.apiGenerate.sendHttpCallWithToken(form , `/api/dj/playlist/${id}/?sampleType=${type}
              `, 'put').subscribe((response) => {
                console.log('subs >>>>>', response);
                this.helper.presentToast('Playlist Updated Successfully' , 'success');
                this.helper.hideLoading();
                this.router.navigate(['myplaylist']);
              }, (err) => {
                this.helper.hideLoading();
                this.helper.presentToast(err.error, 'warning');
              });
              this.helper.hideLoading();
            }
            else {
              this.helper.presentToast('Enter All Fields' , 'warning');
            }
          }
        },
      ]
    });
    await alert.present();
  }

  back() {
    this.helper.goBack();
  }
  process() {
    this.router.navigate(['editdjprofile']);
  }
}
