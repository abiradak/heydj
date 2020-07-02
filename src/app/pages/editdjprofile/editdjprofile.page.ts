import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-editdjprofile',
  templateUrl: './editdjprofile.page.html',
  styleUrls: ['./editdjprofile.page.scss'],
})
export class EditdjprofilePage implements OnInit {
  data: any;
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
    private route: ActivatedRoute,
    public camera: Camera,
    private formBuilder: FormBuilder,
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('Edit Engineer Data', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.Profiledetails;
        console.log('params item: ', this.data);
      }
    });

    this.updateProfile = this.formBuilder.group({
      fname: ['', [Validators.maxLength(20), Validators.minLength(4), Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lname:['', [Validators.maxLength(20), Validators.minLength(2), Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      cuntrycode: [+91, [Validators.required]],
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

 async getUserInfo() {
    const loading = await this.loadingCtrl.create({
      backdropDismiss: true
    });
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    this.apiGenerate.sendHttpCallWithToken('', `/api/user/${userInfo.id}`,
    'get').subscribe((success: any) => {
      console.log('get api result >>>>>>>>>' , success);
      loading.dismiss();
      this.updateProfile.patchValue({
        phone: userInfo.phoneNumber.slice(2,12),
        cuntrycode: +91,
        fname: success.firstName,
        lname: success.lastName,
        email: success.emailId,
        city: success.city
      });
    } , err => {
      this.helper.presentToast(err.error, 'danger');
      loading.dismiss();
    })
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

  updateUserPrifile(){
    if(this.updateProfile.value.fname && this.updateProfile.value.phone) {
      const form = new FormData();
      form.append('firstName' , this.updateProfile.value.fname),
      form.append('lastName' , this.updateProfile.value.lname),
      form.append('phoneNumber' , this.updateProfile.value.cuntrycode + this.updateProfile.value.phone),
      form.append('city' , this.updateProfile.value.city),
      form.append('emailId' , this.updateProfile.value.email),
     // form.append('image' , this.image)
      console.log(form);
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.apiGenerate.sendHttpCallWithToken(form, `/api/user/${userInfo.id}`,
      'put').subscribe((success: any) => {
        console.log(success);
        this.getUserInfo();
        this.helper.presentToast('Profile Successfully Updated' , 'success');
        this.router.navigate(['djmainhome']);
      }, err => {
        this.helper.presentToast(err.error , 'warning');
      });
      
    } else {
      this.helper.presentAlert('Please Enter All Fields', 'Warning!');
    }
  }
}
