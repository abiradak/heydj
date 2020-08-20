import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_MIME_TYPE_VIDEO = 'video/mp4';
const ALLOWED_MIME_TYPE_AUDIO = 'audio/mpeg';

@Component({
  selector: 'app-create-djprofile',
  templateUrl: './create-djprofile.page.html',
  styleUrls: ['./create-djprofile.page.scss'],
})

export class CreateDJprofilePage {

  createDj: FormGroup;
  progressbar = false;

  options: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    correctOrientation: true,
  };
  options2: CameraOptions = {
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true,
    mediaType:this.camera.MediaType.ALLMEDIA,
  };
  successImage: any;
  imgBlob: Blob;
  contentBlob: Blob;
  uploadedVideo: any;
  selectedVideo: string;
  typecontent: any;
  progress: any;
  showSelectedImage: any;
  showSelectedContent: any;
  total: any;
  contentName: any;
  imageName: any;

  
  
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private file: File, 
    private fileChooser: FileChooser
  ) {
    this.createDj = formBuilder.group({
      title: [''],
      ctype: [''],
      type: ['']
    });
  }
  ionViewWillEnter(){
    this.typecontent = 'audio';
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
    this.camera.getPicture(this.options).then((imageData) => {
      console.log('image data >>>>>>>', imageData);
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: any) => {
        entry.file(file => {
          this.showSelectedImage = file.localURL;
          console.log('after resolve' , file);
          this.readFileImage(file);
        });
      });
    }, (err) => {
      console.log('error' , err.error);
    });
  }

  async contenForAudio() {
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
    })
  }

  async contenForVideo() {
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
    // console.log('image data <<<<<<<<' , this.contentBlob)
    reader.readAsArrayBuffer(file);
  }

  
  createDjSubmit() {
    if(this.createDj.value.title && this.imgBlob && this.contentBlob) {
      const form = new FormData();
      
      form.append('title', this.createDj.value.title),
      form.append('thumbnail' , this.imgBlob, this.imageName),
      form.append('type' , this.typecontent),
      form.append('duration' , JSON.stringify(5));

      this.helper.presentToast('Content is uploading....' , 'success');
      setTimeout(() => {
        this.progressbar = true;
        this.createDj.reset();
        this.createDj.disable();
      }, 2000);
      this.apiGenerate.sendHttpForContentCreate(form, `/api/dj/v2/content`, 'post').subscribe((event: any) => {
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
          const uploadUrl = bodyData.contentUploadUrl;
          this.progressbar = false;
          this.showSelectedContent = '';
          this.createDj.enable();
          this.helper.presentToast('Content is uploading....' , 'success');
          setTimeout(() => {
            this.progressbar = true;
            this.createDj.reset();
            this.createDj.disable();
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
              this.helper.presentToast('Content Upload Complete' , 'success');
              this.progressbar = false;
              this.showSelectedContent = '';
              this.createDj.enable();
            }
          }, (err) => {
            console.log('error >>>>>>' , err.error);
            this.progressbar = false;
            this.showSelectedContent = '';
            this.createDj.enable();
            this.helper.presentToast(err.error , 'danger');
          })
        }
      }, err => {
        console.log('error >>>>>>' , err.error);
        this.progressbar = false;
        this.showSelectedContent = '';
        this.createDj.enable();
        this.helper.presentToast(err.error , 'danger');
      })
    } else {
      this.helper.presentToast('All Fields Are Required' , 'warning');
    }
  }
  back() {
    this.helper.goBack();
  }
}
