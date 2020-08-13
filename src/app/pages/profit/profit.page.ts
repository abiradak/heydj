import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiGenerateService } from '../../api-generate.service';
import { MusicService } from '../../music.service';
import { HelperService } from '../../helper.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profit',
  templateUrl: './profit.page.html',
  styleUrls: ['./profit.page.scss'],
})
export class ProfitPage  {
  from: any;
  to: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public apiGenerate: ApiGenerateService,
    private music: MusicService,
    private helper: HelperService,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.profit();
  }

  async openDatetab(type) {
    const alert = await this.alertCtrl.create({
      header: 'Subscribe Later',
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'Enter The Date'
        },
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
          text: 'OK',
          handler: (data) => {
            if (data.date) {
              if(type == 'from') {
                this.from = data.date
              } else if(type == 'to') {
                this.to = data.date;
              }
              console.log('concat >>>>>>>' , data.date);
            }
            else {
              this.helper.presentAlert("Enter Date", "Warning!");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async profit() {
    if(this.from && this.to) {
      this.apiGenerate.sendHttpCallWithToken('' , `/api/dj/earning?from=${this.from}&to=${this.to}` , 'get').subscribe((success) => {
        console.log('success >>>>>>' , success);
      } , (err) => {
        console.log('errorrs coming >>>>>' , err);
      })
    } else {
      this.helper.presentToast('' , 'danger');
    }
  }

  async back() {
    this.helper.goBack();
  }
}
