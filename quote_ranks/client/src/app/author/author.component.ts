import { HttpService } from './../http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  author = {
    username: ''
  };
  submitted = false;

  // Variable to hold our new quote object.
  newRecord: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.author.username = this.signupForm.value.userData.username;
    this.newRecord = {
      'author':  this.signupForm.value.userData.username,
      'quotes': []
    };
    const observable = this._httpService.addRecord(this.newRecord);
    observable.subscribe(data => {
      console.log('Data sent to POST and received response: ', data);
    });

    this.submitted = true;
    this.signupForm.reset();

  }

  onCancel() {
    console.log('Request cancelled!');
  }

}
