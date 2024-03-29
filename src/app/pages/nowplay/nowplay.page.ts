import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-nowplay',
  templateUrl: './nowplay.page.html',
  styleUrls: ['./nowplay.page.scss'],
})


export class NowplayPage implements  AfterViewInit {

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
  nowplay: boolean;
  sampleContent: any;
  sampleType: any;

  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private route: ActivatedRoute,
    private music: MusicService,
  ) {
    const type = this.route.snapshot.paramMap.get('type');
    if(type == 'now') {
      this.nowplay = true;
    } else if(type == 'later') {
      this.helper.presentToast('Your Subscription Will Play later Enjoy The Sample!' , 'success');
      this.nowplay = false;
    } else if(type == 'expire') {
      this.helper.presentToast('Subscribe This now' , 'success');
      this.router.navigate(['mainhome']);
    }
   }

  ionViewWillEnter() {
    this.subdetails();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  async playContent(url , type) {
    if(type == 'audio') {
      this.play(url);
    } else if(type == 'video') {
      this.music.PlayVideo(url);
    }
  }

  async play(url) {
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

  seeking(time): void {
    this._player.currentTime = this._player.currentTime + time;
  }

  seek(e): void {
    console.log('###  seek ', e);      
    console.log('###  seek ', e.target.value);      
    this._player.currentTime = e.target.value;
}

  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          this.isPlay = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlay = false;
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

      this._player.addEventListener('ended' , () => {
        this.showPlay = false;
      });
  }
  

  back() {
    this.router.navigate(['subscriptions']);
  }
  async subdetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCallWithToken('' , `/api/subscription/${id}` ,'get').subscribe((success) => {
      console.log('response coming >>>>>>>' , success);
      this.contentUrl = success.contents;
      this.startTime = new Date(success.startFrom);
      var time = new Date(success.startFrom)
      console.log('start >>>>>', this.startTime);
      var hour = time.setHours(time.getHours() + parseInt(success.hours));
      this.endtime = new Date(hour);
      console.log('last >>>>>', this.endtime);
      console.log('start 12>>>>>', this.startTime);
      this.getPlaylist(success.playlistId);
    }, (error) => {
      console.log('errors coming >>>>>>' , error);
    })
  }

  async getPlaylist(id) {
    this.apiGenerate.sendHttpCallWithToken('' , `/api/playlist/${id}` , 'get').subscribe((success) => {
      this.response = success;
    }, (error) => {
      console.log('errors >>>>' , error);
    });
  }
}
