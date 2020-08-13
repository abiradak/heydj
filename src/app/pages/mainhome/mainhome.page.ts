import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})

export class MainhomePage  {
  searchForm: FormGroup;
  text: string;
  songslist: any;
  pausebutton: boolean;
  genereList: any;
  start : number = 0;
  endall : number = 6;
  endgen: number = 6 ;
  endfeture: number = 6;
  less = false;
  lessgen = false;
  lessfe = false;
  featureList: any;
  portfolioList: any;
  totalSongs: any[] = [];
  newArray: any[] = [];
  searchValue: any;
  

  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = formBuilder.group({
      search: ['',[Validators.required]],
    });
   }


  ionViewWillEnter() {
    this.getAllContents();
    this.getGenreList();
    this.allFeaturePlaylist();
    this.getAllArtist();
  }


  async showMore(){
    this.less = true;
    this.endall = this.endall+6;
  }

  async showLess() {
    this.endall = 6;
    this.less = false;
  }

  async showMoregen() {
    this.lessgen = true;
    this.endgen = this.endgen+6;
  }

  async showLessgen() {
    this.endgen = 6;
    this.lessgen = false;
  }

  async showMorefe() {
    this.lessfe = true;
    this.endfeture = this.endfeture+6;
  }

  async showLessfe() {
    this.endfeture = 6;
    this.lessfe = false;
  }

  async getAllContents(){
    this.apiGenerate.sendHttpCall('', `/api/playlist?all=true`,
    'get').subscribe((response) => {
      console.log('music list>>>>>>>>', response.body.playlists);
      this.songslist = response.body.playlists;
      this.songArraymake();
    }, error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }


  async getGenreList() {
    this.apiGenerate.sendHttpCall('' , '/api/genre' , 'get').subscribe((success) => {
      console.log('genere list >>>' , success.body.genres);
      this.genereList = success.body.genres;
      this.songArraymake();
    },error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  async getAllPlaylistByGenre(genreid) {
    this.apiGenerate.sendHttpCall('' , '/api/playlist?genre=' + genreid , 'get').subscribe((success) => {
      console.log('genre playlist >>>>>>' , success);
    } , error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  async allFeaturePlaylist() {
    this.apiGenerate.sendHttpCall('' , '/api/featured' , 'get').subscribe((success) => {
      console.log('feature list >>>>>>' , success.body.playlists);
      this.featureList = success.body.playlists;
      this.songArraymake();
    } , error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  async getAllArtist() {
    this.apiGenerate.sendHttpCall('' , '/api/user/dj' , 'get').subscribe((success) => {
      this.portfolioList = success.body.djs;
      this.songArraymake();
      console.log('Artist >>>>>>>>>>>>' , this.portfolioList);
    } , error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }

  async process() {
    this.router.navigate(['tutorial']);
  }

  async songArraymake() {
    console.log('hhbjaebf');
    if(this.songslist && this.genereList && this.featureList && this.featureList) {
      console.log('hhbjaebf');
      this.totalSongs = this.songslist.concat(this.genereList , this.featureList ,this.featureList);
      console.log('new song array >>>>>>' , this.totalSongs);
    }
  }

  async search() {
    if(this.searchForm.value.search) {
      this.searchValue = this.searchForm.value.search;
      this.newArray =  this.totalSongs.filter(function(item) {
        if(item.title === this.searchValue) {
          return item;
        } else if(item.name === this.searchValue) {
          return item;
        } else if(`${item.firstName} ${item.lastName}` === this.searchValue) {
          return item;
        }
      });
      console.log('filtered item >>>>>>>' , this.newArray);
    } else {

    }
  }
}
