import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userIcon: string;

  ngOnInit(): void {
    this.userIcon = JSON.parse(localStorage.getItem('user')).photoURL;
  }

  onUserIconClick(event: Event): void {
    // @TODO: open sub menu
    console.log(event);
  }
}
