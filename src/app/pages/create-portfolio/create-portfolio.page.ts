import { Component , ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
import { HelperService } from '../../helper.service';
import { DomSanitizer} from '@angular/platform-browser';
import { error } from 'protractor';


@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.page.html',
  styleUrls: ['./create-portfolio.page.scss'],
})
export class CreatePortfolioPage {

  createPortfolio: FormGroup
  youtubeVideoUrls: any = [];
  url: any;
  isVideo = false;
  youtubeUrls: any = [];

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.createPortfolio = formBuilder.group({
      youtubeurl: [''],
      spotifyurl: ['']
    })
  }

  ionViewWillEnter() {
    this.myPortFolio();
  }

  ////// Video Code //////

  // @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  // isPlay: boolean = false;
  // toggleVideo(event: any) {
  //   this.videoplayer.nativeElement.play();
  // }
  // playPause() {
  //   var myVideo: any = document.getElementById("my_video_1");
  //   if (myVideo.paused) myVideo.play();
  //   else myVideo.pause();
  // }

  // makeBig() {
  //   var myVideo: any = document.getElementById("my_video_1");
  //   myVideo.width = 560;
  // }

  // makeSmall() {
  //   var myVideo: any = document.getElementById("my_video_1");
  //   myVideo.width = 320;
  // }

  // makeNormal() {
  //   var myVideo: any = document.getElementById("my_video_1");
  //   myVideo.width = 420;
  // }

  // skip(value) {
  //   let video: any = document.getElementById("my_video_1");
  //   video.currentTime += value;
  // }

  // restart() {
  //   let video: any = document.getElementById("my_video_1");
  //   video.currentTime = 0;
  // }

  ////// Video Code //////

  async myPortFolio() {
    this.apiGenerate.sendHttpCallWithToken('' , '/api/dj/portfolio' , 'get').subscribe((success) => {
      this.youtubeVideoUrls = success.videoUrls;
      if(this.youtubeVideoUrls.length > 0) {
        this.isVideo = true;
        this.youtubeVideoUrls.forEach((element: string) => {
          element = element.replace('https://www.youtube.com/watch?v=', 'https://youtube.com/embed/'); 
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(element);
          this.youtubeUrls.push(this.url);
          console.log('new array >>>>>>>>>>' , this.youtubeUrls);
        }, (error) => {
          console.log('error coming >>>>>>>>>' , error);
        });
      }
      
      console.log('my portfolio data >>>>>>>>>' , success.videoUrls);
    } ,(err) => {
      console.log('error >>>>>>>' , err.error);
      this.helper.presentToast('You Dont have any PortFolio! Add Some Video' , 'warning');
    })
  }

  async addYoutubeUrls() {
    if(this.createPortfolio.value.youtubeurl) {
      console.log('fghjk' , this.youtubeVideoUrls);
      if(this.youtubeVideoUrls.length > 0) {
          let Urls = [
            this.createPortfolio.value.youtubeurl
          ]
          let videoUrls = Urls.concat(this.youtubeVideoUrls);
          var sendData = {
            videoUrls: videoUrls
          }
          console.log('prepared array >>>>>>>' , sendData);
        var method = 'put';
      } else {
        let sendData = {
          videoUrls : [
            this.createPortfolio.value.youtubeurl
          ]
        }
        var method = 'post';
      }
      this.apiGenerate.sendHttpCallWithToken(sendData , '/api/dj/portfolio' , method).subscribe((success) => {
        console.log('adding urs >>>>>>>>>' , success);
        this.helper.presentToast('Video Added To Portfolio' , 'success');
        this.createPortfolio.reset();
        this.myPortFolio();
      } , (error) => {
        console.log('errors >>>>>>>' , error);
      });
    } else {
      this.helper.presentToast('Enter Youtube Url' , 'danger');
    }
  }

  async back() {
    this.helper.goBack();
  }

  async deleteVideo() {
    this.helper.presentAlert('Process is not Completed','Success');
  }
}
