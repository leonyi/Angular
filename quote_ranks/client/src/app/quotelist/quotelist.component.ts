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

}
