import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiGenerateService } from '../../api-generate.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  phoneNumber: any;
  OTPDetails: any;
  showTd = false;
  showSuccessTd = false;
  showTdp = true;
  OTPstepOne: any;
  OTPstepTwo: any;
  OTPstepThree: any;
  OTPstepFour: any;
  otp: any;
  isLoading = false;
  data: any = { current_phonenumber: '' };
  constructor(
    private router: Router,
    public apiGenerate: ApiGenerateService,
    private keyboard: Keyboard,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
  ) {
    this.apiGenerate.getvalue().then((success: any) => {
      console.log(success);
      this.data = success.data;
      console.log(this.data);
    }, (err) => {
      console.log(err);
    });
    this.route.queryParams.subscribe(params => {
      console.log('Edit Engineer Data', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.phoneNumber = this.router.getCurrentNavigation().extras.state.registerDevice;
        console.log('phoneNumber: ', this.phoneNumber);
      }
    });
  }

  next(el) {
    el.setFocus();
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
  nextGo() {
    this.apiGenerate.presentLoadingWithOptions();
    this.keyboard.hide();
    setTimeout(() => {
      this.otp = this.OTPstepOne + '' + this.OTPstepTwo + '' + this.OTPstepThree + '' + this.OTPstepFour;
      console.log(this.otp);
      const OTPdata = {
        // otp_one: this.OTPstepOne,
        // otp_two: this.OTPstepTwo,
        // otp_three: this.OTPstepThree,
        // otp_four: this.OTPstepFour,
        OTP: this.otp,
        phone: this.phoneNumber,
        // role_id: this.data.id,
        // platform: 'Android'
      };
      console.log(OTPdata);
      this.apiGenerate.presentLoadingWithOptions();
      // this.router.navigate(['/app/tabs/schedule']);
      this.apiGenerate.sendHttpCall('', '/api/auth/otp/verify?phonenumber=' + OTPdata.phone + '&' + 'code=' + OTPdata.OTP, 'get').subscribe(async (success: any) => {
        console.log(success);
        if (success) {
          setTimeout(() => {
            this.dismiss();
          }, 1000);
          this.showSuccessTd = true;
          this.storage.set('currentUser', JSON.stringify(this.data)).then(() => {
            this.apiGenerate.setvalue(success);
            this.apiGenerate.presentToastlogin(success.message);
            this.router.navigate(['/app/tabs/schedule']);
            // this.navCtrl.navigateRoot('/tabs');
          });
          console.log('match');
        } else {
          this.apiGenerate.dismissLoading();
          this.apiGenerate.presentToast(success.message);
          this.showTd = true;
          this.showTdp = false;
          console.log('dismatch');
        }
      }, err => {
        console.log(err.error);
      });
      this.apiGenerate.dismissLoading();
    }, 1000);
  }

  resendOtp() {
    // let appVersionNumber: any;
    this.backToRemove();
    console.log(this.data.current_phonenumber);
    if (this.data.current_phonenumber === null) {
      this.present();
      setTimeout(() => {
        this.dismiss();
      }, 3000);
    } else {
      this.present();
      // this.appVersion.getVersionNumber().then(val => {
      //  appVersionNumber = val;
      const data = [{
        phone: this.data.current_phonenumber,
        role_id: 2,
        // appVersion: appVersionNumber
      }];
      console.log(data);
      this.apiGenerate.presentLoadingWithOptions();
      // this.apiGenerate.sendHttpCall(data, 'logincustomer', 'post').subscribe((success: any) => {
      //   console.log(success);
      //   if (success) {
      //     setTimeout(() => {
      //       this.dismiss();
      //     }, 1000);
      //     this.apiGenerate.dismissLoading();
      //     this.apiGenerate.setvalue(success);
      //     //  localStorage.setItem('currentUser', JSON.stringify(success));
      //     this.router.navigate(['login-otp']);
      //   } else {
      //     this.apiGenerate.dismissLoading();
      //     setTimeout(() => {
      //       this.dismiss();
      //     }, 1000);
      //   }
      // }, err => {
      //   this.apiGenerate.dismissLoading();
      //   console.log(err.error);
      // });
      // });
    }
  }

  backToRemove() {
    this.showTd = false;
    this.showTdp = true;
    this.OTPstepOne = null;
    this.OTPstepTwo = null;
    this.OTPstepThree = null;
    this.OTPstepFour = null;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.showTd = false;
    this.showTdp = true;
    this.OTPstepOne = null;
    this.OTPstepTwo = null;
    this.OTPstepThree = null;
    this.OTPstepFour = null;
    this.apiGenerate.dismissLoading();
  }

  // resendOtp() {
  //   this.router.navigate(['/app/tabs/schedule']);
  // }


}
