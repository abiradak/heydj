import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  process(){
    this.router.navigate(['tutorial']);
  }
}
