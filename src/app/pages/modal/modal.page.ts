import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators , AbstractControl } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { NavigationExtras, Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";


 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  loginForm: FormGroup;
  phone: AbstractControl
  phonenumber: Promise<void>;
  showSuccessTd: boolean;
  token: any;
  userInfo: Promise<void>;
  constructor(
    public formbuilder: FormBuilder,
    public modalController: ModalController,
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    public router: Router,
    private alertCtrl: AlertController,
    private keyboard: Keyboard,
    private storage: Storage,
  ) { 
    this.loginForm = formbuilder.group({
      country_code: [''],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    })
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  loginsubmit() {
    if (this.loginForm.value.phone) {
      // console.log(this.loginForm.valid);
      if (this.loginForm.valid) {
        const data = [{
          phone: this.loginForm.value.phone,
          country_code: 91
        }];
        // console.log('sending>>>>>>>>>' , data);
        this.phonenumber = data[0].country_code+data[0].phone;
        this.helper.presentLoading();
        this.apiGenerate.sendHttpCall('', '/api/auth/otp?phonenumber=' + this.phonenumber, 'get').subscribe((response) => {
          if (response) {
            this.presentAlertPrompt(this.phonenumber);
            // this.apiGenerate.setvalue(success);
            // const navigationExtras: NavigationExtras = {
            //   state: {
            //     registerDevice: data[0].country_code+data[0].phone
            //   }
            // };
            //this.router.navigate(['signup'], navigationExtras);
            this.helper.hideLoading();
          } else {
            this.helper.hideLoading();
          }
        }, err => {
          console.log(err.error);
          this.helper.presentToast(err.error, 'danger');
          this.helper.hideLoading();
        });
      }
    } else {
      this.helper.presentToast('Enter All Fields!', 'warning');
    }
  }

  //For the Otp Box
  async presentAlertPrompt(phonenum) {
    const alert = await this.alertCtrl.create({
      header: 'Otp Box',
      inputs: [
        {
          name: 'otp',
          type: 'number',
          placeholder: 'Input The Otp'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Resend',
          handler: () => {
            this.helper.presentLoading();
            this.apiGenerate.sendHttpCall('', '/api/auth/otp?phonenumber=' + phonenum, 'get').subscribe((response) => {
              if (response) {
                this.helper.hideLoading();
                this.presentAlertPrompt(phonenum);
              } else {
                this.helper.hideLoading();
              }
            }, err => {
              console.log(err.error);
            });
          }
        }, 
        {
          text: 'Ok',
          handler: (data) => {
            if(data.otp){
              this.keyboard.hide();
              const OTPdata = {
                OTP: data.otp,
                phone: phonenum
              };
              console.log('otp verify send data>>>>>>', OTPdata);
              this.helper.presentLoading();
              this.apiGenerate.sendHttpCall('', '/api/auth/otp/verify?phonenumber=' + OTPdata.phone + '&' + 'code=' + OTPdata.OTP, 'get').subscribe((response) => {
                if (response) {
                  this.helper.hideLoading();
                  this.dismiss();
                  this.token = response.headers.get('x-auth-token');
                  localStorage.setItem('token' , JSON.stringify(this.token));
                  localStorage.setItem('userInfo', JSON.stringify(response.body));
                  this.helper.presentToast('Login Successfull' , 'success');
                  if(response.role && response.role == 'dj') {
                    this.router.navigate(['dj-dashboard']);
                    localStorage.setItem('dj', response.role);
                  } else {
                    this.router.navigate(['mainhome']);
                  }
                }
              }, err => {
                this.helper.hideLoading();
                this.helper.presentToast(err.error, 'warning');
                this.presentAlertPrompt(phonenum);
              });
              this.helper.hideLoading();
            }
            else{
              this.helper.presentAlert("Enter The Otp","Warning!");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
