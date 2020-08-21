import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})

export class MainhomePage  {
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
  searchvalue: any = '';
  isSearched: boolean = false;
  audio = [];
  video = [];
  audioAll = [];
  videoAll = [];
  

  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
  ) {
    
   }


  ionViewWillEnter() {
    this.appComponent.sideMenu();
    // this.audio = [];
    // this.video = [];
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
      // this.songslist.forEach(element => {
      //   if(element.sampleType == 'audio') {
      //     this.audioAll.push(element)
      //   } else if(element.sampleType == 'video') {
      //     this.videoAll.push(element);
      //   }
      // });
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
      console.log('audio array >>>>>>>>' , this.featureList);
      this.featureList.forEach(element => {
        if(element.sampleType == 'audio') {
          this.audio.push(element)
        } else if(element.sampleType == 'video') {
          this.video.push(element);
        }
      });
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
    if(this.songslist && this.genereList && this.featureList && this.featureList) {
      this.totalSongs = this.songslist.concat(this.genereList , this.featureList ,this.featureList);
    }
  }

  async onKeyup(key) {
    if(key && key.length > 0) {
      this.isSearched = true;
      var search = this.searchvalue.toLowerCase();
      this.newArray = this.totalSongs.filter(function(item) {
        if(item.title && item.title.toLowerCase().indexOf(search) > -1) {
          return item;
        } 
        // else if(item.name.indexOf(search) > -1) {
        //   return item;
        // } else if(`${item.firstName} ${item.lastName}`.indexOf(search) > -1) {
        //   return item;
        // }
      });
      console.log('filtered item >>>>>>>' , this.newArray);
    } else {
      this.isSearched = false;
    }
  }

  async search() {
    if(this.searchvalue) {
      this.isSearched = true;
      var search = this.searchvalue.toLowerCase();
      this.newArray = this.totalSongs.filter(function(item) {
        if(item.title && item.title.toLowerCase().indexOf(search) > -1) {
          return item;
        }
      });
      console.log('filtered item >>>>>>>' , this.newArray);
    } else {
      this.helper.presentToast('Please Enter a keyword' , 'warning');
    }
  }

  ionViewWillLeave() {
    this.isSearched = false;
    this.searchvalue = '';
  }
}
