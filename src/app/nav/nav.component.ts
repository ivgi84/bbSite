import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bb-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor() { }

  ngOnInit() {
      this.isCollapsed = window.innerWidth < 768;
  }

  toggleForm(){
    this.isCollapsed = !this.isCollapsed;
  }

}
