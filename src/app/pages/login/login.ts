import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { ApiGenerateService } from '../../api-generate.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  loginForm: any;
  isLoading = false;
  roleId: number;
  nnotifyError: any;
  constructor(
    public userData: UserData,
    public router: Router,
    public loadingCtrl: LoadingController,
    public apiGenerate: ApiGenerateService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
  ) {
    this.loginForm = this.formBuilder.group({
      country_code: new FormControl(+91),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      // roleId: new FormControl(2),
    });
  }

  async present() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
    }).then(a => {
      a.present().then(() => {
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    this.loadingCtrl.dismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      animated: true,
      cssClass: 'my-custom-class'
    });
    toast.present();
  }

  Phonekeyup(ev) {
    this.nnotifyError = '';
  }

  // loginsubmit() {
  //   this.router.navigate(['signup']);
  // }
  loginsubmit() {
    if (this.loginForm.value.phone === '') {
      this.apiGenerate.present('Please enter your phone number');
      return false;
    }
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      if (this.loginForm.value === null) {
        this.present();
        setTimeout(() => {
          this.dismiss();
        }, 3000);
      } else {
        // this.present();
        //  this.appVersion.getVersionNumber().then(val => {
        //  appVersionNumber = val;
        const data = [{
          phone: this.loginForm.value.phone,
          country_code: this.loginForm.value.country_code
          // role_id: this.loginForm.value.roleId,
          // appVersion: appVersionNumber
        }];
        console.log(data);
        this.apiGenerate.presentLoadingWithOptions();
        this.apiGenerate.sendHttpCall('', '/api/auth/otp?phonenumber=' + data[0].country_code+data[0].phone, 'get').subscribe((success) => {
          console.log(success);
          if (success) {
            this.dismiss();
            this.apiGenerate.setvalue(success);
            const navigationExtras: NavigationExtras = {
              state: {
                registerDevice: data[0].country_code+data[0].phone
              }
            };
            this.router.navigate(['signup'], navigationExtras);
          } else {
            setTimeout(() => {
              this.dismiss();
            }, 1000);
            this.loginForm.value = null;
          }
        }, err => {
          console.log(err.error);

        });
      }
    }
  }
}

  // onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.userData.login(this.login.username);
  //     this.router.navigateByUrl('/app/tabs/schedule');
  //   }
  // }

  // onSignup() {
  //   this.router.navigateByUrl('/signup');
  // }

