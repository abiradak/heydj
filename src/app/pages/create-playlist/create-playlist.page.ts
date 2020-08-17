import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
import { HelperService } from '../../helper.service';
import {
  FileTransfer,
  FileUploadOptions
} from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE_VIDEO = 'video/mp4';
const ALLOWED_MIME_TYPE_AUDIO = 'audio/mpeg';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage  {

  playlist: FormGroup;
  progressbar = false;
  contentArray: any[] = [];
  imgBlob: Blob;
  contentBlob: Blob;
  showSelectedContent: any;
  imageName: any;
  typecontent = 'audio';
  values: any;
  total: string;
  progress: string;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private file: File, 
    private fileChooser: FileChooser,
    private route: ActivatedRoute
  ) {
    this.playlist = formBuilder.group({
      title: [''],
      price: [''],
      type: ['']
    });
   }

  ionViewWillEnter(){

  }

  openaudiovideo(type) {
    if(type == 'audio'){
      // this.contentName = 'audio.mp3';
      this.typecontent = 'audio';
      // console.log('set data >>>>>>>' , this.typecontent);
    }
    else if(type == 'video'){
      // this.contentName = 'video.mp4';
      this.typecontent = 'video';
      // console.log('set data >>>>>>>' , this.typecontent);
    }
  }

  async uploadthumbnail() {
    this.fileChooser.open().then( async (imageData) => {
      console.log('Image data >>>>>>>>>>', imageData);
      if (imageData) {
        this.file.resolveLocalFilesystemUrl(imageData).then((entry: any) => {
          entry.file(file => {
            // this.showSelectedContent = file.localURL;
            if (file.size > MAX_FILE_SIZE) return this.helper.presentToast('You cannot upload more than 5mb.' , 'danger');
            this.readFileImage(file);
          });
        });
      }
    }, (err) => {
      console.log('error >>>>>>>>>', err);
    })
  }

  async sampleContenForAudio() {
    this.fileChooser.open().then( async (audioData) => {
      console.log('Audio data >>>>>>>>>>', audioData);
      if (audioData) {
        this.file.resolveLocalFilesystemUrl(audioData).then((entry: any) => {
          entry.file(file => {
            this.showSelectedContent = file.localURL;
            if (file.size > MAX_FILE_SIZE) return this.helper.presentToast('You cannot upload more than 5mb.' , 'danger');
            if (file.type !== ALLOWED_MIME_TYPE_AUDIO) return this.helper.presentToast('Incorrect file type.' , 'danger');
            this.readFileContent(file);
          });
        });
      }
    }, (err) => {
      console.log('error >>>>>>>>>', err);
    });
  }

  async sampleContenForVideo() {
    this.fileChooser.open().then( async (videoData) => {
      console.log('video data >>>>>>>>>>', videoData);
      if (videoData) {
        this.file.resolveLocalFilesystemUrl(videoData).then((entry: any) => {
          entry.file(file => {
            console.log('video type >>>><<<<' , file)
            this.showSelectedContent = file.localURL;
            if (file.size > MAX_FILE_SIZE) return this.helper.presentToast('You cannot upload more than 5mb.' , 'danger');
            if (file.type !== ALLOWED_MIME_TYPE_VIDEO) return this.helper.presentToast('Incorrect file type.' , 'danger');
            this.readFileContent(file);
          });
        });
      }
    }, (err) => {
      console.log('error >>>>>>>>>', err);
    })
  }

  readFileImage(file: any) {
    console.log('image name >>>>>>>>', file);
    this.imageName = file;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgBlob = new Blob([reader.result], {
        type: file.type
      });
    };
    reader.readAsArrayBuffer(file);
  }
  readFileContent(file: any) {
    console.log('content name >>>>>>>>', file)
    const reader = new FileReader();
    reader.onloadend = () => {
      this.contentBlob = new Blob([reader.result], {
        type: file.type
      });
    };
    reader.readAsArrayBuffer(file);
  }

  async createPlaylist() {
    this.route.params.subscribe((event: any) => {
      this.contentArray = Object.values(event);
    });
    const form = new FormData();

    form.append('title' , this.playlist.value.title),
    form.append('price' , this.playlist.value.price),
    form.append('thumbnail' , this.imgBlob),
    form.append('sampleType' , this.typecontent),
    form.append('content' , JSON.stringify(this.contentArray))

    this.helper.presentToast('Content is uploading....' , 'success');
      setTimeout(() => {
        this.progressbar = true;
        this.playlist.reset();
        this.playlist.disable();
      }, 2000);

    this.apiGenerate.sendHttpForPlaylistCreate(form , '/api/dj/playlist', 'post').subscribe((event: any) => {
      console.log('hello success >>>>>>>>' , event);
        // console.log('processing >>>>>>>>>>>' , event);
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress");
          const comingtotal =  event.total/1000000;
          const comingprogress = event.loaded/1000000;
          this.total = comingtotal.toFixed(1);
          this.progress = comingprogress.toFixed(1);
        }
        if (event.type === HttpEventType.Response) {
          console.log('Upload Complete');
          let bodyData = event.body;
          this.helper.presentToast('Thumbnail Upload Complete' , 'success');
          const uploadUrl = bodyData.sampleContentUploadUrl;
          this.progressbar = false;
          this.showSelectedContent = '';
          this.playlist.enable();
          this.helper.presentToast('Content is uploading....' , 'success');
          setTimeout(() => {
            this.progressbar = true;
            this.playlist.reset();
            this.playlist.disable();
          }, 2000);
          this.apiGenerate.sendHttpForContentCreate(this.contentBlob , uploadUrl , 'put').subscribe((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log("Upload progress");
              const comingtotal =  event.total/1000000;
              const comingprogress = event.loaded/1000000;
              this.total = comingtotal.toFixed(1);
              this.progress = comingprogress.toFixed(1);
            }
            if (event.type === HttpEventType.Response) {
              this.helper.presentToast('Playlist Created' , 'success');
              this.progressbar = false;
              this.showSelectedContent = '';
              this.playlist.enable();
            }
          }, (err) => {
            console.log('error >>>>>>' , err.error);
            this.progressbar = false;
            this.showSelectedContent = '';
            this.playlist.enable();
            this.helper.presentToast(err.error , 'danger');
          })
        }
    })
  }

  back() {
    this.router.navigate(['djmainhome']);
  }
}
