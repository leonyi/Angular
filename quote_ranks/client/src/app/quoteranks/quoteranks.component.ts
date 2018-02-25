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

  deleteAuthor(record) {
    console.log('Removing requested record: ', record._id);
    const observable = this._httpService.deleteRecordbyId(record._id);
    observable.subscribe(
      data => {
        console.log('Sent request to remove record and recieved response: ', data);
        this.getEntriesFromService();
      },
      error => {
        // Error handling to the UI.
        console.log('Error processing request to remove author!');
      }
    );
  }
}
