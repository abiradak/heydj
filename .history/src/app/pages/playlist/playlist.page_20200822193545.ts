import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// import { setInterval } from 'timers';
declare var RazorpayCheckout: any;

const opts = {
  static: true,
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements  AfterViewInit {  

  @ViewChild('player', { static: false }) public playerElementRef:  ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  private _player: HTMLAudioElement;
  // timeLeft: number = 60;
  interval;

  songsList: any;
  fullData: any;
  img: any;
  playListName: any;
  noSongs: any;
  data: any;
  sampleUrl: any;
  bottomSongImg: any;
  bottomSongname: any;
  playing = false;
  price: any;
  isDJ: any;
  
  
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
  ) {
    this.isDJ = localStorage.getItem('dj');
   }

  ionViewWillEnter() {
    this.getPlaylist();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  async play(url) {
    if(this.data == 'audio') {
      this.playing = true;
      this._player.src = url;
      this._player.play();
      // this.startTimer();
    } else if(this.data == 'video'){
      this.helper.presentToast('Video Playing With Player' , 'success');
      this.playing = true; 
      this.music.PlayVideo(url);
    }
  }

  resume(): void {
    if(this.data == 'audio') {
      this._player.play();
      this.playing = true;
    } else if(this.data == 'video'){
      this.helper.presentToast('Video Playing With Player' , 'success');
      this.playing = true; 
      this.music.PlayVideo(this.sampleUrl);
    }
  }

  pause(): void {
    this._player.pause();
    this.playing = false;
  }
  seeking(number): void {
    this._player.currentTime = this._player.currentTime+number;
  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
      this._player.currentTime = value;
  }
  
  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          console.log('####  playing ');        
          this.isPlaying = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlaying = false;
      });

      this._player.addEventListener('timeupdate', () => {
        // console.log('####  time ', this._player.currentTime, Math.floor(this._player.currentTime));
        console.log('####  test ', this._player.currentTime, this._player.currentTime % 1);
        // this.currentTime = Math.floor(this._player.currentTime);
        // if((this._player.currentTime % 1) == 0){
        //   console.log('####  matched ', this._player.currentTime, this._player.currentTime % 1);
        //   this.currentTime = this._player.currentTime;
        // }
        if(this._player.currentTime == 0){
          console.log('####  matched ', this._player.currentTime, this._player.currentTime % 1);
          this.currentTime = this._player.currentTime;
          setInterval(()=>{
            this.currentTime++;
          }, 1000);
        }
        
      }, false);

      this._player.addEventListener('seeking', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('seeked', () => {
          this.isLoading = false;
      });

      this._player.addEventListener('loadstart', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('loadeddata', () => {
          this.isLoading = false;
          this.duration = Math.floor(this._player.duration);
      });

      this._player.addEventListener('ended' , () => {
        this.playing = false;
      });
      
  }

  

  // startTimer() {
  //   this.currentTime = 0;
  //   this.interval = setInterval(() => {
  //     if(this.currentTime < this.duration) {
  //       console.log('hi');
  //       this.currentTime = this.currentTime+1;
  //       console.log('interval' , this.currentTime);
  //     } else {
  //       console.log('hello');
  //       this.currentTime = this.duration;
  //     }
  //   },1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }

  

  async back() {
    this.helper.goBack();
  }

  async getPlaylist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCall('' , `/api/playlist/${id}` , 'get').subscribe((success: any) => {
      console.log('get playlist by content >>>>>>>>>>' , success.body);
      this.data = success.body.sampleType;
      this.img = success.body.thumbnail;
      this.playListName = success.body.title;
      this.songsList = success.body.content;
      this.noSongs = this.songsList.length;
      this.sampleUrl = success.body.sampleContent;
      this.price = success.body.price;
      this.firstPlaySong(this.sampleUrl);
    })
  }


  async firstPlaySong(url) {
    if(this.data == 'audio') {
      this.play(url);
      this.playing = true; 
      this.bottomSongImg = this.img;
      this.bottomSongname = this.playListName;
    } else if(this.data == 'video') {
      this.playing = true; 
      this.bottomSongImg = this.img;
      this.bottomSongname = this.playListName;
      this.music.PlayVideo(this.sampleUrl);
    }
  }

  async subNow() {
    const token = localStorage.getItem('token');
    if(token) {
      this.subNowAlert();
    } else {
      this.helper.presentToast('Please Login For The Subscription!' , 'warning');
      this.router.navigate(['tutorial']);
    }
  }

  async subNowAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Subscribe Now',
      inputs: [
        {
          name: 'hour',
          type: 'number',
          placeholder: 'Enter The Duration (Hours)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Proceed To Pay',
          handler: (data) => {
            if (data.hour) {
              this.keyboard.hide();
              const id = this.route.snapshot.paramMap.get('id');
              const time = {
                hours: data.hour,
              };
              console.log('otp verify send data>>>>>>', time);
              this.helper.presentLoading();
              this.apiGenerate.sendHttpCallWithToken(time , `/api/playlist/${id}/subscribe?now=true`, 'put').subscribe((response) => {
                console.log('subs >>>>>', response);
                this.helper.hideLoading();
                this.payWithrazor(response);
              }, (err) => {
                this.helper.hideLoading();
                this.helper.presentToast(err.error, 'warning');
              });
              this.helper.hideLoading();
            }
            else {
              this.helper.presentAlert("Enter The Duration", "Warning!");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async subLater() {
    const token = localStorage.getItem('token');
    if(token) {
      this.subLaterAlert();
    } else {
      this.helper.presentToast('Please Login For The Subscription!' , 'warning');
      this.router.navigate(['tutorial']);
    }
  }

  async subLaterAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Subscribe Later',
      inputs: [
        {
          name: 'hour',
          type: 'number',
          placeholder: 'Enter The Duration (Hours)'
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Enter The Date'
        },
        {
          name: 'time',
          type: 'time',
          placeholder: 'Enter The time'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Subscribe',
          handler: (data) => {
            if (data.hour && data.time && data.date) {
              const dateTime = `${data.date}T${data.time}:00+05:30`
              console.log('concat >>>>>>>' , dateTime);
              this.keyboard.hide();
              const id = this.route.snapshot.paramMap.get('id');
              const time = {
                hours: data.hour,
                dateTime: dateTime
              };
              this.helper.presentLoading();
              this.apiGenerate.sendHttpCallWithToken(time , `/api/playlist/${id}/subscribe`, 'put').subscribe((response) => {
                console.log('subs >>>>>', response);
                this.helper.hideLoading();
                this.payWithrazor(response);
              }, err => {
                this.helper.hideLoading();
                this.helper.presentToast(err.error, 'warning');
              });
              this.helper.hideLoading();
            }
            else {
              this.helper.presentAlert("Enter The Otp", "Warning!");
            }
          }
        }
      ]
    });
    await alert.present();
  }



  // Razor Pay Code //
  async payWithrazor(val) {
    const { amount, id } = val;
    console.log(
      "payWithRazor called  >>>>>>>>>>>>>>> ",
      parseFloat(amount) * 100,
      typeof amount
    );

    let razor_key = null;
    switch (window.location.hostname) {
      case "localhost":
        razor_key = "rzp_test_ZuG4AsF333ZWT4";
        break;
      case "testbookonline.tatamotors.com":
        razor_key = "rzp_test_partner_Et2MDRKfbn1S9w";
        break;
      case "bookonline.tatamotors.com":
        razor_key = "rzp_live_partner_Et2MDhsc5ExeDW";
        break;
      default:
        razor_key = "rzp_test_ZuG4AsF333ZWT4";
        break;
    }

    let options: any = {
      key: razor_key,
      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: "INR",
      name: "Hey DJ", // company name or product name
      description: "Hey DJ", // product description
      image: "../../../assets/img/logo.png", // company logo or product image
      order_id: id, // order_id created by you in backend
      modal: {
        escape: false,
      },
      notes: {},
      theme: {
        color: "#0c238a",
      },
    }

    var successCallback = function (payment_id) {
      // alert('payment_id: ' + payment_id);
      this.successPayment(payment_id);
    };

    var cancelCallback = function (error) {
      // alert(error.description + ' (Error ' + error.code + ')');
      //  this.cancelError(error);
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

  successPayment(payment_id) {
    this.helper.presentToast('Payment Successfully Done' , 'success');
    this.router.navigate(['subscriptions']);
  }
}
