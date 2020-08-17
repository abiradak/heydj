import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../helper.service';
import { ApiGenerateService } from '../../api-generate.service';

@Component({
  selector: 'app-nowplay',
  templateUrl: './nowplay.page.html',
  styleUrls: ['./nowplay.page.scss'],
})
export class NowplayPage {
  response = {};
  start: any;
  startTime: any;
  endtime: any;

  constructor(
    private router : Router,
    public helper: HelperService,
    public apiGenerate: ApiGenerateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subdetails();
  }

  back() {
    this.router.navigate(['subscriptions']);
  }
  async subdetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiGenerate.sendHttpCallWithToken('' , `/api/subscription/${id}` ,'get').subscribe((success) => {
      console.log('response coming >>>>>>>' , success);
      const starting = success.startFrom.split("T");
      this.start = starting[0];
      const startingTime = starting[1].split("+");
      this.startTime = startingTime[0];
      const lastTime = this.startTime.split(":");
      this.getPlalist(success.playlistId);
      console.log('endtime>>>>>>>>' , this.endtime);
    }, (error) => {
      console.log('errors coming >>>>>>' , error);
    })
  }

  async getPlalist(id) {
    this.apiGenerate.sendHttpCallWithToken('' , `/api/playlist/${id}` , 'get').subscribe((success) => {
      console.log('gettin playlist >>>>>>>>' , success);
      this.response = success;
    }, (error) => {
      console.log('errors >>>>' , error);
    });
  }

  async playContent(content) {
    var audio = new Audio();
    audio.src = content;
    audio.load();
    audio.play();
  }
}
