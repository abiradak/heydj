import { Component, OnInit } from '@angular/core';
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
  totalSongs: any[] = []

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
    this.logoText();
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
      console.log('music list>>>>>>>>', response.body);
      this.songslist = response.body.playlists;
    }, error => {
      console.log('music list>>>>>>>>', error.error);
    });
  }


  async getGenreList() {
    this.apiGenerate.sendHttpCall('' , '/api/genre' , 'get').subscribe((success) => {
      console.log('genere list >>>' , success.body.genres);
      this.genereList = success.body.genres;
    })
  }

  async getAllPlaylistByGenre(genreid) {
    this.apiGenerate.sendHttpCall('' , '/api/playlist?genre=' + genreid , 'get').subscribe((success) => {
      console.log('genre playlist >>>>>>' , success);
    })
  }

  async allFeaturePlaylist() {
    this.apiGenerate.sendHttpCall('' , '/api/featured' , 'get').subscribe((success) => {
      console.log('feature list >>>>>>' , success.body.playlists);
      this.featureList = success.body.playlists;
    })
  }

  async getAllArtist() {
    this.apiGenerate.sendHttpCall('' , '/api/user/dj' , 'get').subscribe((success) => {
      this.portfolioList = success.body.djs;
      console.log('Artist >>>>>>>>>>>>' , this.portfolioList);
    })
  }

  logoText() {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token) {
      this.text = 'Logout';
    } else {
      this.text = 'Login';
    }
  }

  async process() {
    this.router.navigate(['tutorial']);
  }

  

  async search() {
    if(this.searchForm.value.search) {

      console.log('geting >>>>>>>>' , this.searchForm.value.search);
    } else {

    }
  }
}
