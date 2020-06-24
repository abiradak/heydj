import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Router } from '@angular/router';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor(public confData: ConferenceData,
    private router: Router) { }


  djProfile() {
    this.router.navigate(['create-djprofile']);
   // this.router.navigate(['dj-profile']);
  }
  listernerProfile() {
    this.router.navigate(['createlistenrerprofile']);
   // this.router.navigate(['listerner-profile']);  
  }
 
  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }
}
