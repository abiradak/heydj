import { Injectable } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions , StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  optionsVideo: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => {
      console.log('Error streaming', e); 
    },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: true
  };

  optionsAudio: StreamingAudioOptions = {
    successCallback: () => { console.log('Audio played') },
    errorCallback: (e) => { 
      console.log('Error streaming', e);
    },
    initFullscreen: false,
    bgImage: localStorage.getItem('audioImage'),
  };

  constructor(
    private streamingMedia: StreamingMedia
  ) { }

  async playAudio(url) {
    this.streamingMedia.playAudio(url , this.optionsAudio);
  }

  async PlayVideo(url) {
    this.streamingMedia.playVideo(url, this.optionsVideo);
  }
}
