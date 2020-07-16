import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';


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

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
  ) {
   }
  ionViewWillEnter(){
    this.getUserInfo();
    this.getDjAllContent();
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
    const url = audio.content.split('.com/');
    const finalUrl = url[1].split('?');
    let sendData = {
      'key': finalUrl[0]
    }
    this.apiGenerate.sendHttpCall(sendData , '/api/content/url' , 'post').subscribe((success) => {
      this.music.playAudio(success.url);
    })
  }

  async playVideo(video){
    localStorage.setItem('videoImage', video.thumbnail);
    const url = video.content.split('.com/');
    const finalUrl = url[1].split('?');
    let sendData = {
      'key': finalUrl[0]
    }
    this.apiGenerate.sendHttpCall(sendData , '/api/content/url' , 'post').subscribe((success) => {
      this.music.PlayVideo(success.url);
    })
  }

  async updateContent(content) {
    const contentId = 'b717fae7-6e11-4768-a20d-37c73641344f';
    this.router.navigate(['content-update']);
    // this.apiGenerate.sendHttpCallWithToken(sendData , `/api/dj/content/'${content}` , '')
  }

  back() {
    this.helper.goBack();
  }
  process() {
    this.router.navigate(['editdjprofile']);
  }
}
