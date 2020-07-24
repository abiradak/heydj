import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage {
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
