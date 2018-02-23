import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quoteranks',
  templateUrl: './quoteranks.component.html',
  styleUrls: ['./quoteranks.component.css']
})
export class QuoteranksComponent implements OnInit {
  records = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getEntriesFromService();
  }

  getEntriesFromService() {
    console.log('Inside getEntriesFromService');
    const observable = this._httpService.getRecords();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      this.records = data['data'].sort();
    });
  }

}
