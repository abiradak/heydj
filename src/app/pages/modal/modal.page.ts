import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators , AbstractControl } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiGenerateService } from '../../api-generate.service';
import { HelperService } from '../../helper.service';
import { NavigationExtras, Router } from '@angular/router';

 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  loginForm: FormGroup;
  phone: AbstractControl
  constructor(
    public formbuilder: FormBuilder,
    public modalController: ModalController,
    public apiGenerate: ApiGenerateService,
    public helper: HelperService,
    public router: Router,
    private alertCtrl: AlertController,
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
        // this.apiGenerate.presentLoadingWithOptions();
        this.helper.presentLoading();
        this.apiGenerate.sendHttpCall('', '/api/auth/otp?phonenumber=' + data[0].country_code+data[0].phone, 'get').subscribe((response) => {
          // console.log('success', response);
          if (response) {
            this.presentAlertPrompt();
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
            // this.loginForm.value = null;
          }
        }, err => {
          console.log(err.error);
        });
      }
    } else {
      this.helper.presentToast('Enter All Fields!', 'warning');
    }
  }

  //For the Otp Box
  async presentAlertPrompt() {
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
            const sendData = [{
              phone: this.loginForm.value.phone,
              country_code: 91
            }];
            this.helper.presentLoading();
            this.apiGenerate.sendHttpCall('', '/api/auth/otp?phonenumber=' + sendData[0].country_code+sendData[0].phone, 'get').subscribe((response) => {
              // console.log('success', response);
              if (response) {
                this.helper.hideLoading();
                this.presentAlertPrompt();
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
            let sendData = {
             otp: data.otp
            }
            if(data.otp){
              // this.keyboard.hide();
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
  // dismissmodal() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalCtrl.dismiss({
  //     'dismissed': true
  //   });
  // }
}
