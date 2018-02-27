import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listpets',
  templateUrl: './listpets.component.html',
  styleUrls: ['./listpets.component.css']
})
export class ListpetsComponent implements OnInit {
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
