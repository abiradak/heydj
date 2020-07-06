import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(
    private nativeAudio: NativeAudio
  ) { 

  }

  preloadSimple(id , mp3) {
    this.nativeAudio.preloadSimple(id, mp3).then((success) => {
      console.log('ready simple >>>>' , success);
    } , err => {
      console.log('ready simple err >>>>' , err.error);
    });
  }
  preloadComplex(id , mp3) {
    this.nativeAudio.preloadComplex(id, mp3, 1, 1, 0).then((success) =>{
      console.log('ready simple >>>>' , success);
    } , err => {
      console.log('ready simple err >>>>' , err.error);
    });
  }

  play(id , mp3) {
    this.preloadComplex(id , mp3);
    this.preloadSimple(id , mp3);
    this.nativeAudio.play(id).then((success) => {
      console.log('playing......' , success);
    }, err => {
      console.log('not playing >>>>' , err.error);
    });
  }

  stop(id , mp3) {
    this.nativeAudio.stop(id).then( (success) => {
      console.log('stop >>>>>>>' , success);
    }, err => {
      console.log('stopping >>>>' , err.error);
    });
  }
}
