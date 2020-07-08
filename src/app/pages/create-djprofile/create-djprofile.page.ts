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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE_VIDEO = 'video/mp4';
const ALLOWED_MIME_TYPE_AUDIO = 'audio/mpeg';

@Component({
  selector: 'app-create-djprofile',
  templateUrl: './create-djprofile.page.html',
  styleUrls: ['./create-djprofile.page.scss'],
})

export class CreateDJprofilePage {

  createDj: FormGroup;
  progressbar: boolean;

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
  progress: number;
  
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private storage: Storage,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private file: File, 
    private fileChooser: FileChooser
  ) {
    this.createDj = formBuilder.group({
      title: [''],
      ctype: [],
    });
  }
  ionViewWillEnter(){
    this.typecontent = 'audio';
  }

  openaudiovideo(type) {
    console.log('databc>>>>>', type);
    if(type == 'audio'){
      this.typecontent = 'audio';
      console.log('set data >>>>>>>' , this.typecontent);
    }
    else if(type == 'video'){
      this.typecontent = 'video';
      console.log('set data >>>>>>>' , this.typecontent);
    }
  }


  async uploadthumbnail() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log('image data >>>>>>>', imageData);
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: any) => {
        entry.file(file => {
          console.log('after resolve' , file);
          this.readFileImage(file);
        });
      });
    }, (err) => {
      console.log('error' , err.error);
    });
  }

  async content() {
    this.camera.getPicture(this.options2)
      .then( async (videoUrl) => {
        if (videoUrl) {
          this.uploadedVideo = null;
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});
          } catch(err) {
            return this.helper.presentAlert("Something went wrong.", 'Warning!');
          }
          
          retrievedFile.file( data => {
            console.log('data///////' , data);
              if (data.size > MAX_FILE_SIZE) return this.helper.presentToast('You cannot upload more than 5mb.' , 'danger');
              if (data.type !== ALLOWED_MIME_TYPE_VIDEO) return this.helper.presentToast('Incorrect file type.' , 'danger');
              this.readFileContent(data);
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

  async contenForAudio() {
    this.fileChooser.open().then( async (audioData) => {
      console.log('data >>>>>>>>>>', audioData);
      if (audioData) {
        this.file.resolveLocalFilesystemUrl(audioData).then((entry: any) => {
          entry.file(file => {
            console.log('after resolve' , file);
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

  
  readFileImage(file: any) {
    console.log('file', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgBlob = new Blob([reader.result], {
        type: file.type
      });
    };
    reader.readAsArrayBuffer(file);
  }
  readFileContent(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.contentBlob = new Blob([reader.result], {
        type: file.type
      });
    };
    reader.readAsArrayBuffer(file);
  }

  createDjSubmit() {
    if(this.createDj.value.title && this.imgBlob && this.contentBlob) {

      const form = new FormData();
      form.append('title', this.createDj.value.title),
      form.append('thumbnail' , this.imgBlob),
      form.append('content' , this.contentBlob)

      this.helper.presentToast('Content is uploading....' , 'success');
      setTimeout(() => {
        
        this.createDj.reset();
        this.createDj.disable();
        this.progress += .1
      }, 5000);
      this.apiGenerate.sendHttpCallWithToken(form, `/api/dj/content`,'post').subscribe((success) => {
        console.log('profile image upload >>>>>>' , success);
        this.helper.presentToast('Content uploaded successfully' , 'success');
      }, err => {
        console.log('profile image error >>>>>>' , err.error);
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
