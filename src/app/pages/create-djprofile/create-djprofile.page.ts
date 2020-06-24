import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-create-djprofile',
  templateUrl: './create-djprofile.page.html',
  styleUrls: ['./create-djprofile.page.scss'],
})
export class CreateDJprofilePage implements OnInit {
  createDJProfile: any;
  base64Image = '';
  updatePicture: boolean;
  isLoading = false;
  user: any;
  phoneNumber: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private storage: Storage,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
  ) {
    this.createDJProfile = this.formBuilder.group({
      djname: new FormControl('', [Validators.maxLength(20), Validators.required]),
      phone: new FormControl(''),
      // phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      workHistory: new FormControl('', [Validators.required]),
    });
    this.storage.get('currentUser').then(value => {
      console.log(value);
    });
    this.apiGenerate.getvalue().then((success: any) => {
      console.log(success);
      this.phoneNumber = success.data;
      console.log(this.phoneNumber);
    }, (err) => {
      console.log(err);
    });
  }
  async uploadImg() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select anyone',
      buttons: [{
        text: 'Album',
        icon: 'albums',
        handler: () => {
          console.log('albums clicked');
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
            console.log(imageData);
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(this.base64Image);
            this.updatePicture = true;
            console.log(this.updatePicture);
          }, (err) => {
            console.log(err.error);
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
            console.log(imageData);
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(this.base64Image);
            this.updatePicture = true;
            console.log(this.updatePicture);
          }, (err) => {
            console.log(err.error);
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

  async present() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      backdropDismiss: true
    }).then(a => {
      a.present().then(() => {
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    this.loadingCtrl.dismiss();
  }

  createdjProfile() {
    const emailPattern = /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    // if (this.base64Image === '') {
    //   this.apiGenerate.present('Please upload your profile image');
    //   return false;
    // }
    if (this.createDJProfile.value.djname === '') {
      this.apiGenerate.present('Please Enter your Name.');
      return false;
    }
    // if (this.createDJProfile.value.phone === '' || this.createDJProfile.value.phone == null ||
    //   this.createDJProfile.value.phone === undefined || this.createDJProfile.value.phone === this.user.phoneNumber) {
    //   this.apiGenerate.present('Please enter your Phone Number');
    //   return false;
    // }
    if (this.createDJProfile.value.email === '') {
      this.apiGenerate.present('Please enter your Email (ex:abcd@email.com)');
      return false;
    }
    if (!emailPattern.test(this.createDJProfile.value.email)) {
      this.apiGenerate.present('Please enter valid Email (ex:abcd@email.com)');
      return false;
    }
    if (this.createDJProfile.value.address === '') {
      this.apiGenerate.present('Please enter your Address');
      return false;
    }
    if (this.createDJProfile.value.about === '') {
      this.apiGenerate.present('Please write about your work');
      return false;
    }
    if (this.createDJProfile.value.workHistory === '') {
      this.apiGenerate.present('Please write your work History.');
      return false;
    }

    if (this.createDJProfile.valid) {
      if (this.createDJProfile.value === null) {
        this.present();
        setTimeout(() => {
          this.dismiss();
        }, 3000);
      } else {
        this.present();
        const data = [{
          profile_picture: this.base64Image,
          djname: this.createDJProfile.value.djname,
          phone: this.createDJProfile.value.phone,
          email: this.createDJProfile.value.email,
          address: this.createDJProfile.value.address,
          about: this.createDJProfile.value.about,
          workHistory: this.createDJProfile.value.workHistory,
          // eng_company_name: this.RegisterForm.value.companyName,
          // role_id: '3',
          // device_platform: this.device.platform,
          // device_uuid: this.device.uuid,
          // device_model: this.device.model,
          // device_version: this.device.version,
          // device_manufacturer: this.device.manufacturer
        }];
        console.log('body', data);
        this.storage.get('currentUser').then(value => {
          this.apiGenerate.sendHttpCallWithToken(data, '/api/user/dj',
            'post', (value).api_token).subscribe((success: any) => {
              console.log(success);
              // if (success.resp === 'true') {
              //   this.dismiss();
              //   this.router.navigate(['/tabs/home']);
              // } else {
              //   this.dismiss();
              // }
            }, err => {
              console.log(err.error);
            });
          console.log(value);
        });
      }
    } else {
    }
  }
  ngOnInit() {
  }

}
