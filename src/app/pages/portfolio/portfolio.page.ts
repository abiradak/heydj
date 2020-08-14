import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
@Pipe({ name: 'safe' })

export class PortfolioPage {

  
  portfolioDetails: any = {};
  userInfo: any = {};
  isVideo = false;

  youtubeUrls = [];
  url: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    // private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
    private sanitizer: DomSanitizer
  ) { }

  ionViewWillEnter() {
    this.getPortFolioDetails();
  }

  back() {
    this.helper.goBack();
  }

  async getPortFolioDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCall('' , `/api/portfolio/${id}` , 'get').subscribe((success) => {
      console.log('detaisl portfolio >>>>>>>>>>>' , success.body);
      this.portfolioDetails = success.body;
      this.getDjDetails(this.portfolioDetails.id);
      if(this.portfolioDetails.videoUrls.length > 0) {
        this.isVideo = true;
        this.portfolioDetails.videoUrls.forEach((element: string) => {
          element = element.replace('https://youtu.be/', 'https://youtube.com/embed/'); 
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(element);
          this.youtubeUrls.push(this.url);
        });
        console.log('khfgfd>>>>>>>>' , this.youtubeUrls)
      } else {
        console.log('no video found >>>>>>>');
      }
    } , (err) => {
      this.helper.presentToast(err.error , 'danger');
      this.router.navigate(['mainhome']);
    });
  }


  async getDjDetails(id) {
    this.apiGenerate.sendHttpCall('' , `/api/user/${id}` , 'get').subscribe((success) => {
      console.log('Dj Details >>>>>>>>' , success);
      this.userInfo = success.body;
    })
  }
}
