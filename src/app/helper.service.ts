import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  formated = new Date();

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  loading: any;
  globaldata: any;

  emitChange(data: string) {
    this.emitChangeSource.next(data);
  }


  constructor(
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    private location: Location,
    public toastController: ToastController
  ) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  
  //New Method
  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      position: 'top',
      duration: 2000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
     spinner: 'crescent',
     message: 'Please Wait!',
     translucent: true,
     cssClass: 'custom-class custom-loading'
    });
   await this.loading.present();
 }

 async hideLoading(){
   await this.loading.dismiss();
   console.log('Loading dismissed!');
 }

 //New Method
 async presentAlert(message,header) {
  const alert = await this.alertCtrl.create({
    header: header,
    message: message,
    buttons: ['OK']
  });
  await alert.present();
}

isToken() {
  const token = localStorage.getItem('token');
  if (token == null) {
    return false;
  } else {
    return true;
  }
}

  async presentAlertForEmpty() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Please Enter All Details',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertForNoData() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'No Data Found',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertForImageUpFail2() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Something Went Wrong!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  //Back Button 
  goBack(){
    this.location.back();
  }

  //Changing The Date Format For Html Into mm-dd-yy
  changeDateFormatForHtml(date) {
    let arr = date.split("/");
    return `${arr[0]}-${arr[1]}-${arr[2]}`;
  }
  //
  changeDateFormat(date){
    let arr = date.split('-');
    return `${arr[0]}/${arr[1]}/${arr[2]}`;
  }
  changeDateFormat2(date){
    const  formated = date.toString().substring(0, 10);
    let arr = formated.split('-');
    return `${arr[0]}/${arr[1]}/${arr[2]}`;
  }

  setvalue(data) {
    this.globaldata = data;
  }

  getvalue() {
    return new Promise((resolve, reject) => {
      if (this.globaldata) {
        resolve({ data: this.globaldata });
      } else {
        reject({ data: null });
      }
    });
  }
}
