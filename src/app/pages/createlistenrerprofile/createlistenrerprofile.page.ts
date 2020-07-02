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
  imageURI: any;
  image_path: any;
  transfer: any;
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
          
          this.camera.getPicture(options).then(
            imageData => {
              this.imageURI = imageData;
              console.log('image data.............',imageData);
              const fileTransfer: any = this.transfer.create();
              let userInfo = JSON.parse(localStorage.getItem('userInfo'));
              const form  = new FormData();
              form.append('image' , this.imageURI)
              this.apiGenerate.sendHttpCallWithToken(form, `/api/user/${userInfo.id}`,
              'put').subscribe((success) => {
                console.log('profile image upload>>>>>>' , success);
              }, err => {
                console.log('profile image error>>>>>>' , err.error);
              })
              // let options: FileUploadOptions = {
              //   fileKey: "photo",
              //   fileName: "ionicfile.jpg",
              //   chunkedMode: false,
              //   mimeType: "image/jpeg/png",
              //   headers: { 
              //     Authorization: JSON.parse(localStorage.getItem('token'))
              //   },
              //   params: {
              //     id: localStorage.getItem('UserId')
              //   }
              // };
              
              // fileTransfer
              //   .upload(
              //     this.imageURI,
              //     'https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev/api/user',
              //     options
              //   )
              //   .then(
              //     data => {
              //       let pic = JSON.parse(data.response);
              //       console.log('proposer response.......',pic);
              //       let message = pic.message;
              //       if(pic.status == 'SUCCESS'){
              //         this.image_path = pic.image_path;
              //         localStorage.setItem('ImagePath',this.image_path);
              //         this.helper.presentToast(message,"success");
              //       }
              //       else {
              //         this.helper.presentToast("Something Went Wrong!","danger");
              //       }
              //     },
              //     err => {
              //       console.log(err);
              //       alert(JSON.stringify(err));
              //     }
              //   );
            },
            err => {
              console.log(err);
              //this.presentToast(err);
            }
          );
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
