import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-get-demo',
  templateUrl: './get-demo.component.html',
  styleUrls: ['./get-demo.component.css']
})
export class GetDemoComponent implements OnInit {
  notFound = false;
  //user: user

  constructor() { }

  ngOnInit() {
  }

  getUser(userId: string){
    this.notFound = false;
    //this.user = null;
  }

}
