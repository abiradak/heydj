import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
import { HelperService } from '../../helper.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions
} from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-createlistenrerprofile',
  templateUrl: './createlistenrerprofile.page.html',
  styleUrls: ['./createlistenrerprofile.page.scss'],
})
export class CreatelistenrerprofilePage  {
  updateProfile: FormGroup;
  base64Image = '';
  updatePicture: boolean;
  isLoading = false;
  phoneNumber: any;
  userId: any;
  userInfo: any;
  image: string;
  imageURI: any;
  image_path: any;
  successImage: any;
  private win: any = window;

  options: CameraOptions = {
    quality: 30,
    allowEdit: true,
    targetHeight: 720,
    targetWidth: 720,
    destinationType: this.camera.DestinationType.FILE_URI,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  };

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private storage: Storage,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
    private transfer: FileTransfer,
    private file: File, 
  ) {
    this.updateProfile = this.formBuilder.group({
      fname: ['', [Validators.maxLength(20), Validators.minLength(4), Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lname:['', [Validators.maxLength(20), Validators.minLength(4), Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      cuntrycode: ['', [Validators.required]],
      phone: [''],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )]],      
    });
  }

  ionViewWillEnter() {
    console.log('entering ');
    this.getUserInfo();
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      // formData.append('name', 'ionic');
      formData.append('profileImage', imgBlob, file.name);
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.helper.presentLoading();
      this.apiGenerate.sendHttpCallWithToken(formData, `/api/user/${userInfo.id}`,
        'put').subscribe((success) => {
          this.helper.hideLoading();
          console.log('profile image upload >>>>>>' , success);
          this.successImage = success.profileImage
        }, err => {
          console.log('profile image error >>>>>>' , err.error);
        })
    };
    reader.readAsArrayBuffer(file);
  }

  uploadImg() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: any) => {
        entry.file(file => {
          console.log('after resolve' , file);
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
    });
  }
  
  back() {
    this.helper.goBack();
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
    'get').subscribe((success: any) => {
      console.log('get api result >>>>>>>>>' , success);
      this.successImage = success.profileImage,
      this.updateProfile.patchValue({
        phone: userInfo.phoneNumber.slice(2,12),
        cuntrycode: 91,
        fname: success.firstName,
        lname: success.lastName,
        email: success.emailId,
        city: success.city
      });
    } , err => {
      console.log('error coming >>>' , err);
      this.helper.presentToast(err.error, 'danger');
    })
  }

  updateUserProfile(){
    if(this.updateProfile.value.fname && this.updateProfile.value.phone) {
      const form = new FormData();
      form.append('firstName' , this.updateProfile.value.fname),
      form.append('lastName' , this.updateProfile.value.lname),
      form.append('phoneNumber' , this.updateProfile.value.cuntrycode + this.updateProfile.value.phone),
      form.append('city' , this.updateProfile.value.city),
      form.append('emailId' , this.updateProfile.value.email)
      // form.append('profileImage' , this.imageURI)
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.apiGenerate.sendHttpCallWithToken(form, `/api/user/${userInfo.id}`,
      'put').subscribe((success: any) => {
        console.log(success);
        this.getUserInfo();
        this.helper.presentToast('Profile Successfully Updated' , 'success');
        this.router.navigate(['mainhome']);
      }, err => {
        this.helper.presentToast(err.error , 'warning');
      });
    } else {
      this.helper.presentAlert('Please Enter All Fields', 'Warning!');
    }
  }
}
