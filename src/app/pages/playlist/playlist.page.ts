import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements  AfterViewInit {
  

  @Input() src: string;
  @ViewChild('player') playerElementRef: ElementRef; 
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
  playing: boolean = false;
  price: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private helper: HelperService
  ) { }

  ionViewWillEnter() {
    this.getPlaylist();
  }

  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  play(): void {
    this.playing = true ;
    this._player.paused ? this._player.play() : this._player.pause();
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

  async playSongs() {
    
  }

  async firstPlaySong() {
    if(this.data == 'audio') {
      this.music.playAudio(this.sampleUrl);
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
}
