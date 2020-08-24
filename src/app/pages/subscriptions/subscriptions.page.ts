import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage {
  currentSub: any;
  expiredSub: any;
  upcomingSub = [];
  empty1 = false;
  empty2 = false;
  nowSub = [];
  empty3 = false;
  songslist = [];
  nowSub3 = [];
  upcomingsub2 = [];
  newExpire = [];
  

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
    private alertCtrl: AlertController,
    public modalController: ModalController
  ) { }
  
  

  ionViewWillEnter() {
    this.nowSub3 = [];
    this.upcomingsub2 = [];
    this.newExpire = [];
    this.nowSub = [];
    this.upcomingSub = [];
    this.getAllPlaylist();
    this.mySubscriptions();
  }

  async mySubscriptions() {
    this.apiGenerate.sendHttpCallWithToken('' , '/api/subscription' , 'get').subscribe((success) => {
      this.getAllPlaylist();
      console.log('getting >>>>>>>>>>>', success);
      this.currentSub = success.currentSubscriptions;
      this.expiredSub = success.expiredSubscriptions;
      this.currentSub.forEach(element => {
        var start = element.startFrom.split("T");
        var date = new Date();
        if(start[0].slice(-2) > date.getDate()){
          this.upcomingSub.push(element);
        } else {
          this.nowSub.push(element);
        }
        console.log('1st >>>>>',this.nowSub);
      });
      if(this.nowSub && this.nowSub.length == 0) {
        this.empty1 = true;
      } 
      if(this.expiredSub && this.expiredSub.length == 0) {
        this.empty2 = true;
      }
      if(this.upcomingSub.length == 0) {
        this.empty3 = true;
      }
    }, (error) => {
      console.log('errors >>>>>>>>' , error);
    });
  }

  async getAllPlaylist(){
    this.apiGenerate.sendHttpCall('', `/api/playlist?all=true`,
    'get').subscribe((response) => {
      console.log('music list>>>>>>>>', response.body.playlists);
      this.songslist = response.body.playlists;
      this.makeSubscriptionArray();
    }, error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  async makeSubscriptionArray() {
    if(this.nowSub && this.nowSub.length > 0) {
      this.nowSub.forEach(element => {
        this.songslist.filter((item) => {
          if(element.playlistId === item.id){
            var obj = {...item , ...element};
            this.nowSub3.push(obj);
            console.log('2ndnew >>>>>',this.nowSub3);
          }
        });
      });
    }
    if(this.upcomingSub && this.upcomingSub.length > 0) {
      this.upcomingSub.forEach(element => {
        this.songslist.filter((item) => {
          if(element.playlistId === item.id){
            var obj = {...item , ...element};
            this.upcomingsub2.push(obj);
            console.log('2ndup >>>>>',this.upcomingsub2);
          }
        });
      });
    }
    if(this.expiredSub && this.expiredSub.length > 0) {
      this.expiredSub.forEach(element => {
        this.songslist.filter((item) => {
          if(element.playlistId === item.id){
            var obj = {...item , ...element};
            this.newExpire.push(obj);
            console.log('2ndup >>>>>',this.upcomingsub2);
          }
        });
      });
    }
  }
}
