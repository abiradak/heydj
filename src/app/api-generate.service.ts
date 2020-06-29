import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
export const apiUrl = 'https://xug5l9nwo4.execute-api.ap-south-1.amazonaws.com/dev';

@Injectable({
  providedIn: 'root'
})

export class ApiGenerateService {
  alert: any;
  globaldata: any;
  settedValue: any;
  token = JSON.parse(localStorage.getItem('token'));
  constructor(
    private storage: Storage,
    public http: HttpClient,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
  }


  sendHttpCallWithToken(data: any = '', url: any, method: any) {
    if (navigator.onLine === false) {
      this.showToast('Opps, unable to connect internet');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'accept': 'aplication/json',
          Authorization: this.token
        })
      };
      console.log(httpOptions);
      switch (method) {
        case 'post':
          console.log(data);
          return this.http.post<any>(apiUrl + url, (data), httpOptions);

        case 'get':
          console.log(data);
          return this.http.get<any>(apiUrl + url, httpOptions);

        case 'put':
          console.log(data);
          return this.http.put<any>(apiUrl + url, (data), httpOptions);

        case 'delete':
          console.log(data);
          return this.http.delete<any>(apiUrl + url, httpOptions);

        default:
          console.log('Add method');
      }
    }
  }

  sendHttpCall(data: any = '', url: any, method: any, opt: HttpHeaders = null) {
    switch (method) {
      case 'post':
        console.log(data);
        return this.http.post<any>(apiUrl + url, (data), { headers: opt });

      case 'get':
        console.log(data);
        return this.http.get<any>(apiUrl + url , { observe: 'response' });

      case 'put':
        console.log(data);
        return this.http.put<any>(apiUrl + url, (data));

      case 'delete':
        console.log(data);
        return this.http.delete<any>(apiUrl + url);

      default:
        confirm('Add Method');
    }
  }


  message(msg: string) {
    this.alert = this.alertController.create({
      header: 'ALERT',
      message: msg,
      // buttons:[{
      //   text: "No"
      // },{
      //   text:"Yes",
      //   handler:()=>{

      //     // this.menu.close();
      //     // this.nav.navigateRoot(['login']);

      //   }
      // }]
    }).then((alert) => {
      alert.present();
    });

    // return this.alert.present();
  }

  async showToast(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 3000
    });
    toast.present();
  }

  async presentToastCheckEngineerEmail(message) {
    const toast = await this.toastController.create({
      message: 'EmailID exist.Please try another one!',
      duration: 3000
    });
    toast.present();
  }

  async presentToastSignupErr(message) {
    const toast = await this.toastController.create({
      message: 'Something Wrong!',
      duration: 3000
    });
    toast.present();
  }

  async presentToastlogin(message) {
    const toast = await this.toastController.create({
      message: 'You are successfully loged In',
      duration: 3000
    });
    toast.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: 'Username Or Password is not match!',
      duration: 3000
    });
    toast.present();
  }

  async presentToastOTP(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  async presentOTPdismatch(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  async present(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async checkDeviceUUid(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async forgetPW(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      //   translucent: true,
      // cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => { });
    });
    //  return await loading.present();
  }

  async UpdateEngProfileSuccessmsg(message) {
    const toast = await this.toastController.create({
      message: 'Profile data successfully update!',
      duration: 3000
    });
    toast.present();
  }

  dismissLoading() {
    this.loadingController.dismiss();
    console.log('Loading dismissed!');
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
