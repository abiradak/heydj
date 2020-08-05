import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    // private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
  ) { }

  ionViewWillEnter() {
    this.getPortFolioDetails();
  }

  async getPortFolioDetails() {

  }
}
