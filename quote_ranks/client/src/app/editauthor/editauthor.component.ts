import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  author = {
    username: ''
  };
  submitted = false;

  defaultUserName: string;
  record: any;
  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.route.params.subscribe ( params => this.params = params ); }

  ngOnInit() {
    this.fetchAuthor();
  }

  onSubmit() {
    console.log('Submitted!');
    this.record[0].author = this.signupForm.value.userData.username;
    const observable = this._httpService.editRecord(this.record[0]);
    observable.subscribe(data => {
      console.log('Sent request to update record and received this response: ', data);
    });

    this.submitted = true;
    this.signupForm.reset();
    this.goHome();
  }

  fetchAuthor() {
    console.log('Retrieving author from DB with ID: ', this.params.id);
    const observable = this._httpService.getRecordbyId(this.params.id);
    observable.subscribe(data => {
      console.log('Got requested record with this data: ', data);
      this.record = data['data'];
      this.defaultUserName = this.record[0].author;
    });
  }

  onCancel() {
    console.log('Request Cancelled!');
  }

  goHome() {
    this.router.navigate(['/quoteranks']);
  }
}
