import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editquote',
  templateUrl: './editquote.component.html',
  styleUrls: ['./editquote.component.css']
})
export class EditquoteComponent implements OnInit {
  quoterank_record: any;
  author: string;

  // Needed to get the ide from the route URL.
  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router

  ) { this.route.params.subscribe ( params => this.params.params = params ); }

  ngOnInit() {
    this.fetchAuthor();
  }

  fetchAuthor() {
    console.log('Retrieving author record from DB with ID: ', this.params.id);
    const observable = this._httpService.getRecordbyId(this.params.id);
    observable.subscribe(data => {
      console.log('Got record with this data: ', data);
      this.quoterank_record = data['data'];
      this.author = this.quoterank_record[0].author;
    });
  }
}
