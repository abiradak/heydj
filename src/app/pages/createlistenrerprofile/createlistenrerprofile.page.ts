import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-createlistenrerprofile',
  templateUrl: './createlistenrerprofile.page.html',
  styleUrls: ['./createlistenrerprofile.page.scss'],
})
export class CreatelistenrerprofilePage implements OnInit {
  createProfile: any;
  base64Image = '';
  updatePicture: boolean;
  isLoading = false;
  phoneNumber: any;
  userId: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    private storage: Storage,
    public apiGenerate: ApiGenerateService,
    public loadingCtrl: LoadingController,
  ) {
    this.createProfile = this.formBuilder.group({
      fname: new FormControl('', [Validators.maxLength(20), Validators.required]),
      lname: new FormControl('', [Validators.maxLength(20), Validators.required]),
      phone: new FormControl(''),
      // phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
    this.storage.get('currentUser').then(value => {
      console.log(value);
      this.userId = value.id;
      console.log(this.userId);
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
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
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
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
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

  createlistenerProfile() {
    const emailPattern = /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (this.createProfile.value.fname === '') {
      this.apiGenerate.present('Please enter your first name');
      return false;
    }
    if (this.createProfile.value.lname === '') {
      this.apiGenerate.present('Please enter your last name');
      return false;
    }
    // if (this.createProfile.value.phone === '' || this.createProfile.value.phone == null || this.createProfile.value.phone === undefined) {
    //   this.apiGenerate.present('Please enter your Phone Number');
    //   return false;
    // }
    if (this.createProfile.value.address === '') {
      this.apiGenerate.present('Please enter your Address');
      return false;
    }
    if (this.createProfile.value.email === '') {
      this.apiGenerate.present('Please enter your Email (ex:abcd@email.com)');
      return false;
    }
    if (!emailPattern.test(this.createProfile.value.email)) {
      this.apiGenerate.present('Please enter valid Email (ex:abcd@email.com)');
      return false;
    }
    if (this.createProfile.value.role === '') {
      this.apiGenerate.present('Please select your Role');
      return false;
    }
    if (this.createProfile.value.password === '') {
      this.apiGenerate.present('Please Enter your password');
      return false;
    }
    if (this.createProfile.value.confirmpassword === '') {
      this.apiGenerate.present('Please enter your 6 digit Confirm password.');
      return false;
    }
    if (this.createProfile.value.password !== this.createProfile.value.confirmpassword) {
      this.apiGenerate.present('Please enter your Correct Password.');
      return false;
    }

    if (this.createProfile.valid) {
      if (this.createProfile.value === null) {
        this.present();
        setTimeout(() => {
          this.dismiss();
        }, 3000);
      } else {
        this.present();
        const data = [{
         // profile_picture: this.base64Image,
          fname: this.createProfile.value.fname,
          lname: this.createProfile.value.lname,
          phone: this.createProfile.value.phone,
          city: this.createProfile.value.city,
          email: this.createProfile.value.email,
          role: this.createProfile.value.role,
          password: this.createProfile.value.password,
          confirmpassword: this.createProfile.value.confirmpassword,
          // eng_company_name: this.RegisterForm.value.companyName,
          // role_id: this.userId,
          // device_platform: this.device.platform,
          // device_uuid: this.device.uuid,
          // device_model: this.device.model,
          // device_version: this.device.version,
          // device_manufacturer: this.device.manufacturer
        }];
        console.log('body', data);
        this.storage.get('currentUser').then(async value => {
          this.apiGenerate.sendHttpCallWithToken(data, '/api/admin/user',
            'post',value.api_token).subscribe((success: any) => {
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
