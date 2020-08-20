import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import {
  FileTransfer,
  FileUploadOptions
} from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

const MAX_FILE_SIZE = 100 * 1024 * 1024;

@Component({
  selector: 'app-content-update',
  templateUrl: './content-update.page.html',
  styleUrls: ['./content-update.page.scss'],
})
export class ContentUpdatePage {

  updateDj: FormGroup;
  progressbar = false;
  showSelectedImage: any;
  imageName: any;
  imgBlob: Blob;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private file: File, 
    private fileChooser: FileChooser,
    private route: ActivatedRoute
  ) {
    this.updateDj = formBuilder.group({
      title: [''],
      
    });
   }

  ionViewWillEnter() {
     this.getContent();
  }

  async uploadthumbnail() {
    this.fileChooser.open().then( async (imageData) => {
      console.log('Image data >>>>>>>>>>', imageData);
      if (imageData) {
        this.file.resolveLocalFilesystemUrl(imageData).then((entry: any) => {
          entry.file(file => {
            this.showSelectedImage = file.localURL;
            if (file.size > MAX_FILE_SIZE) return this.helper.presentToast('You cannot upload more than 5mb.' , 'danger');
            this.readFileImage(file);
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

  
  async getContent() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id >>>>>>>' , id);
    this.apiGenerate.sendHttpCallWithToken('' ,'/api/dj/content/' + id, 'get').subscribe((success) => {
       console.log('content details >>>>>>>>>>' , success);
       this.showSelectedImage = success.thumbnail;
       this.updateDj.patchValue({
        title: success.title
       })
    })
  }

  back() {
    this.helper.goBack();
  }

  async updateDjSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    const form = new FormData();
    form.append('title' , this.updateDj.value.title),
    form.append('thumbnail' , this.imgBlob)

    this.apiGenerate.sendHttpCallWithToken(form , '/api/dj/content/'+ id , 'put').subscribe((success: any) =>{
      this.helper.presentToast('Content Updated Successfully' , 'success');
      this.getContent();
    } , (err) => {
      console.log('' , err);
      this.helper.presentToast(err.error , 'danger');
    })
  }
}
