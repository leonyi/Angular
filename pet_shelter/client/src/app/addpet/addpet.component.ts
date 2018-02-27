import { Router } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  pet = {
    name: '',
    type: '',
    description: '',
    skills: [],
  };
  submitted = false;
  record: any;
  errorMessage: string;
  skill: string;
  skills: any;

  newRecord: any;

  constructor(
    private _httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // This is ugly but need to make this work first!
    // Need to come back to this!!
    // if (this.signupForm.value.userData.skill1) {
    //   this.skill = this.signupForm.value.userData.skill1;
    //   this.skills.push(this.skill);
    // }
    // if (this.signupForm.value.userData.skill2) {
    //   this.skill = this.signupForm.value.userData.skill2;
    //   this.skills.push(this.skill);
    // }
    // if (this.signupForm.value.userData.skill3) {
    //   this.skill = this.signupForm.value.userData.skill3;
    //   this.skills.push(this.skill);
    // }

    this.newRecord = {
      'name': this.signupForm.value.userData.name,
      'type': this.signupForm.value.userData.type,
      'description': this.signupForm.value.userData.description,
      'skills': this.skills
    };

    const observable = this._httpService.addRecord(this.newRecord);
    observable.subscribe(
      data => {
      console.log('Data sent to POST and received response: ', data);
        this.record = data;
        if ( this.record.errors && this.record.name === 'ValidationError') {
          this.errorMessage = 'Invalid name entry!';
        } else {
          this.errorMessage = '';
        }
      },
      error => {
        // Chatches errors with regards to connections to the service.
        console.log('Error processing request to add new author: ', error);
        this.errorMessage = 'Error processing request to add new author!';
      }
    );

    this.submitted = true;
    this.signupForm.reset();
     // Maybe we want to add more than one author.
    // this.backHome();

  }

  backHome() {
    this.router.navigate(['/listpets']);
  }

}
