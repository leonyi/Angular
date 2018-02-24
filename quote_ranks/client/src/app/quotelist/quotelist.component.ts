import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotelist.component.html',
  styleUrls: ['./quotelist.component.css']
})
export class QuotelistComponent implements OnInit {
  quotes = [];
  quoterank_record: any;
  author: string;

  // Needed to get the id from the route URL.
  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router

  ) { this.route.params.subscribe( params => this.params = params ); }

  ngOnInit() {
    this.getQuoterankRecord();
  }

  getQuoterankRecord() {
    console.log('Getting quoteranks record with ID: ', this.params.id);
    const observable = this._httpService.getRecordbyId(this.params.id);
    observable.subscribe(data => {
      console.log('Got the record with this data: ', data);
      this.quoterank_record = data['data'];
      this.quotes = this.quoterank_record[0].quotes;
      this.author = this.quoterank_record[0].author;
    });
  }

  deleteQuote(index) {
    console.log(`Deleting quote at index ${index} from record ${this.params.id}`);
    const observable = this._httpService.deleteQuote(this.params.id, index);
    observable.subscribe(
      data => {
        console.log('Request to delete quote from record sent and received: ', data);
        this.getQuoterankRecord();
      },
      error => {
        // Error handling here.
        console.log('Error handling delete request!');
      }
    );
  }

  voteupQuote(record, index) {
    record.index = index;
    console.log(`Increasing vote for ${record.quote} at index ${record.index}`);
    const observable = this._httpService.upvoteQuote(this.params.id, record);
    observable.subscribe(
      data => {
        console.log('Request to up vote for quote sent and received: ', data);
        this.getQuoterankRecord();
      },
      error => {
        // Error handling here
        console.log('Error processing your request to upvote!');
      }
    );
  }

  votedownQuote(record, index) {
    record.index = index;
    console.log(`Increasing vote for ${record.quote} at index ${record.index}`);
    const observable = this._httpService.downvoteQuote(this.params.id, record);
    observable.subscribe(
      data => {
        console.log('Request to down-vote for quote was sent and received: ', data);
        this.getQuoterankRecord();
      },
      error => {
        // Error handling here
        console.log('Error processing your request to downvote');
      }
    );
  }

}

