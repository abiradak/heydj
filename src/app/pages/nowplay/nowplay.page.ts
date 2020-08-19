import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';

@Component({
  selector: 'app-nowplay',
  templateUrl: './nowplay.page.html',
  styleUrls: ['./nowplay.page.scss'],
})


export class NowplayPage {
  @ViewChild('player', { static: false }) public playerElementRef:  ElementRef;

  isPlaying = false;
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

  async playContent(content) {
    this.isPlaying = true;
    this.showPlay = true;
    this.audio = new Audio();
    this.audio.src = content;
    this.audio.load();
    this.audio.currentTime = 0;
    this.audio.play();
  }
  
  pause() {
    this.showPlay = false;
    this.audio.pause();
  }

  resume() {
    this.showPlay = true;
    this.audio.play();
  }

  // replay() {
  //   this.isReplay = 
  //   this.audio.currentTime = 0;
  //   this.audio.play();
  // }

  endAudio() {
    this.audio.e
  }

  seek(){
    this.audio.fastSeek(10);
  }
}
