import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.component.html',
  styleUrls: ['./editpet.component.css']
})
export class EditpetComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  pet = {
    username: '',
    type: '',
    description: '',
    skills: [],
  };

  submitted = false;

  defaultName: string;
  defaultType: string;
  defaultDescription: string;
  record: any;
  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.route.params.subscribe ( params => this.params = params ); }

  ngOnInit() {
    this.fetchPet();
  }

  onSubmit() {
    console.log('Submitted!');
    this.record.name = this.signupForm.value.userData.name;
    this.record.type = this.signupForm.value.userData.type;
    this.record.description = this.signupForm.value.userData.description;

    console.log('Description is: ', this.record.description);

    const observable = this._httpService.editRecord(this.record);
    observable.subscribe(data => {
      console.log('Sent request to update record and received this response: ', data);
    });

    this.submitted = true;
    this.signupForm.reset();
    this.goHome();
  }

  fetchPet() {
    console.log('Retrieving author from DB with ID: ', this.params.id);
    const observable = this._httpService.getRecordbyId(this.params.id);
    observable.subscribe(data => {
      console.log('Got requested pet record with this data: ', data);
      this.record = data[0];
      this.defaultName = this.record.name;
      this.defaultType = this.record.type;
      this.defaultDescription = this.record.description;
    });
  }

  goHome() {
    this.router.navigate(['/listpets']);
  }

}
