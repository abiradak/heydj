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
    this.mySubscriptions();
  }

  async mySubscriptions() {
    this.apiGenerate.sendHttpCallWithToken('' , '/api/subscription' , 'get').subscribe((success) => {
      console.log('getting')
    }, (error) => {

    });
  }
}
