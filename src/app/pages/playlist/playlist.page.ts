import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { WindowRefService } from "../../window-ref.service";

const opts = {
  static: true,
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements  AfterViewInit {
  
  @Input() src: string;
  @ViewChild('player', opts) playerElementRef: ElementRef; 

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  private _player: HTMLAudioElement;


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
  // songUrl: 'https://heydj-images-bucket-rt3ea5hg-dev.s3.ap-south-1.amazonaws.com/music/1593726681354-testSong.mp3';
  

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
    private winRef: WindowRefService,
  ) { }

  ionViewWillEnter() {
    this.playAudio();
    this.getPlaylist();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/alarm.wav";
    audio.load();
    audio.play();
  }
  
  // https://heydj-images-bucket-rt3ea5hg-dev.s3.ap-south-1.amazonaws.com/music/1593726681354-testSong.mp3
  play(url): void {
    this.playing = true;
    // this.songUrl = url;
    // console.log('hello >>>>>>>>>' , this.songUrl);
    this.src = url;
    console.log('hello >>>>>>>>>' , this.src);
    this._player.play();
  }

  pause(): void {
    this._player.pause();
    this.playing = false;
  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
      this._player.currentTime = value;
  }

  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          this.isPlaying = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlaying = false;
      });

      this._player.addEventListener('timeupdate', () => {
          this.currentTime = Math.floor(this._player.currentTime);
      });

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
  }

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
      this.firstPlaySong();
    })
  }


  async firstPlaySong() {
    if(this.data == 'audio') {
      this.play(this.sampleUrl);
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
                this.payWithRazor(response);
              }, err => {
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
                this.payWithRazor(response);
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
  
  payWithRazor(val) {
    console.log("payWithRazor called  >>>>>>>>>>>>>>> ");

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
      image: `../../../assets/img/logo.png`, // company logo or product image
      order_id: id, // order_id created by you in backend
      // account_id,
      modal: {
        escape: false,
      },
      notes: {},
      theme: {
        color: "#0c238a",
      },
    }
    
    options.handler = (response, error) => {
      // options.response = response;
      //this.helper.presentLoading(); 
      console.log(
        "payWithRazor called  >>>>>>>>>>>>>>> ",
        response,
        "razorpay_order_id",
        "razorpay_payment_id",
        "razorpay_signature"
      );
      if (response) {
        this.helper.presentToast('Your Payment is successfully done' , 'success')
        console.log('response coming >>>>>>>>>' , response);
        // this.helper.hideLoading();
      } else if (error) {
        // this.helper.hideLoading();
        console.log('error coming >>>>>>>>' , error);
      }
      // console.log('payWithRazor called  >>>>>>>>>>>>>>> ', options);
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log("Transaction cancelled.");
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", (response) => {
      console.log("payment failed  >>>>>>>>>>>>>>  ", response);
      // this.loading = true;
      // let payload = {
      //   razorpay_order_id: response.error.metadata.order_id,
      //   razorpay_payment_id: response.error.metadata.payment_id,
      //   build_pin: sessionStorage.getItem("buildPin"),
      //   reason: "payment-failed",
      // };

      // console.log("payment failed  api call data >>>>>>>>>>>>>>  ", payload);

      // this._api.paymentFail(payload).subscribe(
      //   (data: any) => {
      //     console.log(
      //       "paymentFail  >>>>>>>>>>>>>>>>>>>>>  ",
      //       JSON.parse(atob(data))
      //     );
      //     if (data) {
      //       data = JSON.parse(atob(data));
      //       if (data.status == "1") {
      //         sessionStorage.removeItem('custId');
      //         window.location.href = data.response.redirect_url;
      //       } else {
      //         this.loading = false;
      //       }
      //     } else {
      //       this.loading = false;
      //     }
      //   },
      //   (err) => {
      //     console.log("error responce paymentFail >>>>>>>>>>>>>  ", err);
      //   }
      // );
    });
  }
}
