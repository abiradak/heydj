import { Component, OnInit } from '@angular/core';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { Router } from '@angular/router';
import { MusicService } from '../../music.service';
import { Media } from '@ionic-native/media/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
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

  constructor(
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private router: Router,
    private music: MusicService,
    private media: Media,
    private alertCtrl: AlertController,
    public modalController: ModalController
  ) { }
  
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.nowSub = [];
    this.upcomingSub = [];
    this.mySubscriptions();
  }

  async mySubscriptions() {
    this.apiGenerate.sendHttpCallWithToken('' , '/api/subscription' , 'get').subscribe((success) => {
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
      });
      console.log('new ,.,.,.,' , this.upcomingSub);
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
}
