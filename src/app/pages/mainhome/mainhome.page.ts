import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {
  text: string;
  constructor(
    private router : Router,
    public helper: HelperService,
  ) { }

  ngOnInit() {
    this.logoText();
  }

  logoText() {
    let token = JSON.parse(localStorage.getItem('token'));
    if(token) {
      this.text = 'Logout';
    } else {
      this.text = 'Login';
    }
  }

  process(){
    this.router.navigate(['tutorial']);
  }

  logout(){
    localStorage.removeItem('token');
    this.logoText();
    this.helper.presentToast('Successfully Logged Out' , 'success');
  }
}
