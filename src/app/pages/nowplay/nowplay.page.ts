import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';

@Component({
  selector: 'app-nowplay',
  templateUrl: './nowplay.page.html',
  styleUrls: ['./nowplay.page.scss'],
})


export class NowplayPage implements  AfterViewInit {

  // @Input() public src: string;
  @ViewChild('player', { static: false }) public playerElementRef:  ElementRef;

  isPlay = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  private _player: HTMLAudioElement;




  response = {};
  start: any;
  startTime: any;
  endtime: any;
  audio: HTMLAudioElement;
  contentUrl = [];
  isPlaying = false;
  showPlay = false;
  songUrl: any;
  src: string;

  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subdetails();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  // ffh
  async playContent(url) {
    console.log('src 000>>>>><<<<' , url);
    this.isPlaying = true;
    this.showPlay = true;
    this._player.src = url;
    this._player.play();
  }

  pause(): void {
    this.showPlay = false;
    this._player.pause();
  }

  resume():void {
    this.showPlay = true;
    this._player.play();
  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
      this._player.currentTime = value;
  }

  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          this.isPlay = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlay = false;
      });

      // this._player.addEventListener('timeupdate', () => {
      //     this.currentTime = Math.floor(this._player.currentTime);
      // });



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
      console.log('src >>>>><<<<' , this._player.currentSrc);
      // this._player.load();
  }
  // jdbfvbs

  back() {
    this.router.navigate(['subscriptions']);
  }
  async subdetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCallWithToken('' , `/api/subscription/${id}` ,'get').subscribe((success) => {
      console.log('response coming >>>>>>>' , success);
      this.contentUrl = success.contents
      const starting = success.startFrom.split("T");
      this.start = starting[0];
      const startingTime = starting[1].split("+");
      this.startTime = startingTime[0];
      const lastTime = this.startTime.split(":");
      this.getPlaylist(success.playlistId);
      console.log('endtime>>>>>>>>' , this.endtime);
    }, (error) => {
      console.log('errors coming >>>>>>' , error);
    })
  }

  async getPlaylist(id) {
    this.apiGenerate.sendHttpCallWithToken('' , `/api/playlist/${id}` , 'get').subscribe((success) => {
      console.log('gettin playlist >>>>>>>>' , success);
      this.response = success;
    }, (error) => {
      console.log('errors >>>>' , error);
    });
  }

  // async playContent(content) {
  //   this.isPlaying = true;
  //   this.showPlay = true;
  //   this.audio = new Audio();
  //   this.audio.src = content;
  //   this.audio.load();
  //   this.audio.currentTime = 0;
  //   this.audio.play();
  // }
  
  // pause() {
  //   this.showPlay = false;
  //   this.audio.pause();
  // }

  // resume() {
  //   this.showPlay = true;
  //   this.audio.play();
  // }
  // seek(){
  //   this.audio.fastSeek(10);
  // }
}
