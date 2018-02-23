import { HttpService } from './../http.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  quote = {
    quotecontent: ''
  };
  submitted = false;

  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router

  ) { this.route.params.subscribe( params => this.params = params); }

  ngOnInit() {
  }

  onSubmit() {
    // New quote content
    this.quote.quotecontent = this.signupForm.value.quoteData.quotecontent;
    // Push this entry into the editedRecord array of quotes.
    console.log('This is the new quote content: ', this.quote.quotecontent);

    // Send a put request to the backend to update the record.
    const observable = this._httpService.editRecord(this.params.id, this.quote);
    observable.subscribe(data => {
      console.log('Data sent to PUT and recieved response: ', data);
      this.router.navigate(['/quotelist', this.params.id]);
    });

    this.submitted = true;
    this.signupForm.reset();
  }

  onCancel() {
    console.log('Request to add quote cancelled!');
  }
}
