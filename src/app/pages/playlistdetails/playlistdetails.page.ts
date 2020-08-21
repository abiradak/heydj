import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.page.html',
  styleUrls: ['./playlistdetails.page.scss'],
})
export class PlaylistdetailsPage {

  @ViewChild('player', { static: false }) public playerElementRef:  ElementRef;

  isPlay = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  private _player: HTMLAudioElement;

  
  playList = {};
  playListContent: any;
  isPlaying = false;
  showPlay = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.getPlaylistContents();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }
  
  async getPlaylistContents() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCallWithToken('' , `/api/dj/playlist/${id}` , 'get').subscribe((success: any) => {
      console.log('get playlist by content >>>>>>>>>>' , success.playlist);
      this.playList = success.playlist;
      this.playListContent = success.playlist.content
    } , (err) => {
      console.log('' , err.error);
      
    });
  }

  // Audio //

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

  seeking({ detail: { value } }: { detail: { value: number } }): void {
    this._player.currentTime = value;
  }

  seek(): void {
    this._player.currentTime = this._player.currentTime + 10;
  }

  private _bindPlayerEvents(): void {
      this._player.addEventListener('playing', () => {
          this.isPlay = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlay = false;
      });

      // this._player.addEventListener('timeupdate', () => {
      //   this.currentTime = Math.floor(this._player.currentTime);
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

      this._player.addEventListener('ended' , () => {
        this.showPlay = false;
      });
  }


  // Audio //

  back() {
    this.helper.goBack();
  }
}
