import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-createlistenrerprofile',
  templateUrl: './createlistenrerprofile.page.html',
  styleUrls: ['./createlistenrerprofile.page.scss'],
})
export class CreatelistenrerprofilePage implements OnInit {
  updateProfile: FormGroup;
  base64Image = '';
  updatePicture: boolean;
  isLoading = false;
  phoneNumber: any;
  userId: any;
  userInfo: any;
  image: string;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private storage: Storage,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
    public helper: HelperService,
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

  ngOnInit() {
    this.getUserInfo();
  }

  async uploadImg() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select anyone',
      buttons: [{
        text: 'Album',
        icon: 'albums',
        handler: () => {
          // console.log('albums clicked');
          const options: CameraOptions = {
            quality: 100,
            allowEdit: true,
            targetHeight: 720,
            targetWidth: 720,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          };
          this.camera.getPicture(options).then((imageData) => {
            this.image = imageData;
            this.updatePicture = true;
          }, (err) => {
          });
        }
      }, {
        text: 'Capture',
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            targetHeight: 720,
            targetWidth: 720,
          };

          this.camera.getPicture(options).then((imageData) => {
            this.image = imageData;
            this.updatePicture = true;
          }, (err) => {
          });
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  back() {
    this.router.navigate(['/app/tabs/schedule']);
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
    'get').subscribe((success: any) => {
      console.log('get api result >>>>>>>>>' , success);
      this.updateProfile.patchValue({
        phone: userInfo.phoneNumber.slice(2,12),
        cuntrycode: 91,
        fname: success.firstName,
        lname: success.lastName,
        email: success.emailId,
        city: success.city
      });
    } , err => {
      this.helper.presentToast(err.error, 'danger');
    })
  }

  updateUserPrifile(){
    if(this.updateProfile.value.fname && this.updateProfile.value.phone) {
      const form = new FormData();
      form.append('firstName' , this.updateProfile.value.fname),
      form.append('lastName' , this.updateProfile.value.lname),
      form.append('phoneNumber' , this.updateProfile.value.cuntrycode + this.updateProfile.value.phone),
      form.append('city' , this.updateProfile.value.city),
      form.append('emailId' , this.updateProfile.value.email),
      form.append('image' , this.image)
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.apiGenerate.sendHttpCallWithToken(form, `/api/user/${userInfo.id}`,
      'put').subscribe((success: any) => {
        this.getUserInfo();
        this.helper.presentToast('Profile Successfully Updated' , 'success');
      }, err => {
        this.helper.presentToast(err.error , 'warning');
      });
    } else {
      this.helper.presentAlert('Please Enter All Fields', 'Warning!');
    }
  }
}
