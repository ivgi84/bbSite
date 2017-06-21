import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in-form/sign-in.service';

@Component({
  selector: 'bb-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(private SignInService:SignInService) { }

  ngOnInit() {
      this.isCollapsed = window.innerWidth < 768;
  }

  toggleForm(){
    this.isCollapsed = !this.isCollapsed;
  }

}
